import type { Project, WeeklyProgress } from "../store/types";

export interface ProgressCategory {
  subProjectId: string;
  subProjectName: string;
  categoryId: string;
  categoryName: string;
  weight: number;
  startWeek: number;
  durationWeeks: number;
}

export function calculateWeeklyProgressData(
  project: Project,
  selectedWeek: number,
  totalProjectDirectCost: number
) {
  const numWeeks = project.durationWeeks || 12;

  const allCategories: ProgressCategory[] = project.subProjects.flatMap((sub) =>
    sub.categories.map((cat) => ({
      subProjectId: sub.id,
      subProjectName: sub.name,
      categoryId: cat.id,
      categoryName: cat.name,
      weight: totalProjectDirectCost > 0 ? (cat.items.reduce((sum, item) => sum + item.total, 0) / totalProjectDirectCost) * 100 : 0,
      startWeek: cat.startWeek || 1,
      durationWeeks: cat.durationWeeks || 1,
    }))
  );

  const weeklyPlannedWeights = Array(numWeeks).fill(0);
  allCategories.forEach((cat) => {
    const start = Math.max(1, Math.min(numWeeks, cat.startWeek));
    const duration = Math.max(1, cat.durationWeeks);
    const end = Math.min(numWeeks, start + duration - 1);
    const distributedWeight = cat.weight / duration;
    for (let w = start - 1; w < end; w++) {
      weeklyPlannedWeights[w] += distributedWeight;
    }
  });

  const cumulativePlannedWeights: number[] = [];
  let currentCumulativePlanned = 0;
  for (let w = 0; w < numWeeks; w++) {
    currentCumulativePlanned += weeklyPlannedWeights[w];
    cumulativePlannedWeights.push(Math.min(100, currentCumulativePlanned));
  }

  const currentWeekRecord = project.weeklyProgress?.find((wp) => wp.weekNumber === selectedWeek);
  let cumulativeActualWeight = 0;
  allCategories.forEach((cat) => {
    const progressPercentage = currentWeekRecord?.actualCategoryProgress[cat.categoryId] ?? 0;
    cumulativeActualWeight += (progressPercentage / 100) * cat.weight;
  });
  cumulativeActualWeight = Math.min(100, cumulativeActualWeight);

  const plannedProgress = cumulativePlannedWeights[selectedWeek - 1] || 0;
  const deviation = cumulativeActualWeight - plannedProgress;

  // Cumulative budget planned vs actual
  let cumulativePlannedBudget = 0;
  allCategories.forEach((cat) => {
    const catSubtotal = project.subProjects.find(s => s.id === cat.subProjectId)?.categories.find(c => c.id === cat.categoryId)?.items.reduce((s, i) => s + i.total, 0) || 0;
    const weeklyPlanned = catSubtotal / Math.max(1, cat.durationWeeks);
    for (let w = 1; w <= selectedWeek; w++) {
      if (w >= cat.startWeek && w < cat.startWeek + cat.durationWeeks) {
        cumulativePlannedBudget += weeklyPlanned;
      }
    }
  });

  const cumulativeActualCost = (project.weeklyFinancials || [])
    .filter((f) => f.weekNumber <= selectedWeek)
    .reduce((sum, f) => sum + f.actualCost, 0);

  const isOverBudget = cumulativeActualCost > cumulativePlannedBudget;
  const budgetDeficit = cumulativeActualCost - cumulativePlannedBudget;

  return {
    allCategories,
    cumulativePlannedWeights,
    cumulativeActualWeight,
    plannedProgress,
    deviation,
    cumulativePlannedBudget,
    cumulativeActualCost,
    isOverBudget,
    budgetDeficit,
    currentWeekRecord,
  };
}
