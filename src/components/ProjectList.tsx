import { useRABStore, Project } from "@/lib/store";
import { formatRupiah } from "@/lib/excel-export";

interface ProjectListProps {
  onOpenNewProjectModal: () => void;
}

export const calculateProjectTotals = (project: Project) => {
  const subProjects = project?.subProjects || [];
  const directCost = subProjects.reduce((acc, sub) => {
    const categories = sub?.categories || [];
    return acc + categories.reduce((subAcc, cat) => {
      const items = cat?.items || [];
      return subAcc + items.reduce((sum, item) => sum + item.total, 0);
    }, 0);
  }, 0);
  const profit = directCost * project.profitRate;
  const directWithProfit = directCost + profit;
  const tax = directWithProfit * project.taxRate;
  const grandTotal = directWithProfit + tax;

  return {
    directCost,
    profit,
    tax,
    grandTotal,
  };
};

export const calculateProjectProgress = (project: Project) => {
  const weekly = project.weeklyProgress || [];
  if (weekly.length === 0) return 0;
  const latestWeek = weekly.reduce((max, curr) => curr.weekNumber > max.weekNumber ? curr : max, weekly[0]);
  if (!latestWeek) return 0;
  const { directCost } = calculateProjectTotals(project);
  if (directCost === 0) return 0;
  let totalActualWeight = 0;
  project.subProjects.forEach((sub) => {
    sub.categories.forEach((cat) => {
      const catSubtotal = cat.items.reduce((sum, item) => sum + item.total, 0);
      const catWeight = (catSubtotal / directCost) * 100;
      const progressPercentage = latestWeek.actualCategoryProgress[cat.id] ?? 0;
      totalActualWeight += (progressPercentage / 100) * catWeight;
    });
  });
  return Math.min(100, totalActualWeight);
};

export default function ProjectList({ onOpenNewProjectModal }: ProjectListProps) {
  const { projects, activeProjectId, setActiveProject } = useRABStore();

  return (
    <div className="w-full md:w-80 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 flex flex-col h-full">
      {/* Header section of Sidebar */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-950">
        <h2 className="text-sm font-semibold tracking-tight text-zinc-500 dark:text-zinc-400 uppercase">
          Daftar Proyek ({projects.length})
        </h2>
        <button
          onClick={onOpenNewProjectModal}
          type="button"
          className="text-xs flex items-center gap-1 text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300 font-semibold transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Baru
        </button>
      </div>

      {/* Projects List Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {projects.map((project) => {
          const isActive = project.id === activeProjectId;
          const { grandTotal } = calculateProjectTotals(project);
          const progressVal = calculateProjectProgress(project);

          return (
            <button
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              type="button"
              className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1.5 ${
                isActive
                  ? "bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm"
                  : "bg-white/60 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-50 line-clamp-1">
                  {project.name}
                </span>
                <span className="text-[9px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded-md shrink-0">
                  {project.subProjects.length} Div
                </span>
              </div>
              
              {project.description && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              )}

              {progressVal > 0 && (
                <div className="w-full mt-1 space-y-1">
                  <div className="flex justify-between text-[9px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                    <span>Progres Aktual</span>
                    <span>{progressVal.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-zinc-250 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 dark:bg-emerald-600 h-full rounded-full transition-all duration-300" style={{ width: `${progressVal}%` }} />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-baseline mt-1 border-t border-zinc-100 dark:border-zinc-800 pt-2 w-full">
                <span className="text-[10px] text-zinc-400 font-medium">Estimasi Biaya:</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  {formatRupiah(grandTotal)}
                </span>
              </div>
            </button>
          );
        })}

        {projects.length === 0 && (
          <div className="text-center py-12 px-4 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-white/20 dark:bg-zinc-950/10">
            <svg className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V4a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Belum ada proyek RAB.
            </p>
            <button
              onClick={onOpenNewProjectModal}
              type="button"
              className="mt-3 px-3 py-1.5 text-xs bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-semibold rounded-lg shadow-sm transition-colors"
            >
              Buat Proyek Pertama
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
