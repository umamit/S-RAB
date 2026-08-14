"use client";
import React from "react";
import { Project, useRABStore } from "@/lib/store";
import { calculateProjectTotals } from "../ProjectList";
import ScheduleHeader from "./ScheduleHeader";
import SCurveChart from "./SCurveChart";
import ScheduleTable from "./ScheduleTable";
import type { ScheduleCategory } from "./ScheduleTable";
import GanttChart from "./GanttChart";


interface ScheduleManagerProps {
  project: Project;
}

export default function ScheduleManager({ project }: ScheduleManagerProps) {
  const { updateCategorySchedule, updateProjectDuration } = useRABStore();
  const { directCost: totalProjectDirectCost } = calculateProjectTotals(project);
  const numWeeks = project.durationWeeks || 12;

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 12;
    const clamped = Math.max(4, Math.min(26, val));
    updateProjectDuration(project.id, clamped);
  };

  const allCategories: ScheduleCategory[] = project.subProjects.flatMap((sub) =>
    sub.categories.map((cat) => {
      const catSubtotal = cat.items.reduce((sum, item) => sum + item.total, 0);
      const catWeight = totalProjectDirectCost > 0 ? (catSubtotal / totalProjectDirectCost) * 100 : 0;
      return {
        subProjectId: sub.id,
        subProjectName: sub.name,
        categoryId: cat.id,
        categoryName: cat.name,
        weight: catWeight,
        startWeek: cat.startWeek || 1,
        durationWeeks: cat.durationWeeks || 1,
      };
    })
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
  let currentCumulative = 0;
  for (let w = 0; w < numWeeks; w++) {
    currentCumulative += weeklyPlannedWeights[w];
    cumulativePlannedWeights.push(Math.min(100, currentCumulative));
  }

  const weeklyActualWeights = Array(numWeeks).fill(0);
  let maxRecordedWeek = 0;
  project.weeklyProgress?.forEach((wp) => {
    if (Object.values(wp.actualCategoryProgress).some((v) => v > 0)) {
      maxRecordedWeek = Math.max(maxRecordedWeek, wp.weekNumber);
    }
  });

  for (let w = 1; w <= numWeeks; w++) {
    const wkRecord = project.weeklyProgress?.find((wp) => wp.weekNumber === w);
    if (wkRecord) {
      let actualSum = 0;
      allCategories.forEach((cat) => {
        const pct = wkRecord.actualCategoryProgress[cat.categoryId] ?? 0;
        actualSum += (pct / 100) * cat.weight;
      });
      weeklyActualWeights[w - 1] = Math.min(100, actualSum);
    } else if (w > 1) {
      weeklyActualWeights[w - 1] = weeklyActualWeights[w - 2];
    }
  }

  return (
    <div className="space-y-8 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm print:p-0 print:border-none print:shadow-none">
      <ScheduleHeader numWeeks={numWeeks} onDurationChange={handleDurationChange} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SCurveChart
          totalProjectDirectCost={totalProjectDirectCost}
          numWeeks={numWeeks}
          maxRecordedWeek={maxRecordedWeek}
          cumulativePlannedWeights={cumulativePlannedWeights}
          weeklyActualWeights={weeklyActualWeights}
          profitRate={project.profitRate}
          taxRate={project.taxRate}
          weeklyFinancials={project.weeklyFinancials}
        />
        <ScheduleTable
          projectId={project.id}
          allCategories={allCategories}
          numWeeks={numWeeks}
          updateCategorySchedule={updateCategorySchedule}
        />
        <GanttChart
          project={project}
          allCategories={allCategories}
          numWeeks={numWeeks}
        />
      </div>
    </div>

  );
}
