"use client";
import React from "react";
import { Project } from "@/lib/store";
import { calculateProjectTotals } from "../ProjectList";
import SummaryCards from "./SummaryCards";
import DistributionChart from "./DistributionChart";
import ResourceAllocation from "./ResourceAllocation";

interface BudgetSummaryProps {
  project: Project;
}

export default function BudgetSummary({ project }: BudgetSummaryProps) {
  const { directCost, profit, tax, grandTotal } = calculateProjectTotals(project);

  const categoryBreakdown = project.subProjects.flatMap((sub) =>
    sub.categories.map((cat) => {
      const cost = cat.items.reduce((sum, item) => sum + item.total, 0);
      return { name: `${cat.name} (${sub.name})`, cost, percentage: directCost > 0 ? (cost / directCost) * 100 : 0 };
    })
  ).filter((c) => c.cost > 0);

  const sortedBreakdown = [...categoryBreakdown].sort((a, b) => b.cost - a.cost);

  let totalMaterials = 0;
  let totalLabor = 0;
  let totalTools = 0;
  let totalMisc = 0;

  project.subProjects.forEach((sub) => {
    sub.categories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.ahsp) {
          const matSum = item.ahsp.materials.reduce((sum, e) => sum + e.coefficient * e.unitPrice, 0) * item.quantity;
          const labSum = item.ahsp.labor.reduce((sum, e) => sum + e.coefficient * e.unitPrice, 0) * item.quantity;
          const toolSum = item.ahsp.tools.reduce((sum, e) => sum + e.coefficient * e.unitPrice, 0) * item.quantity;
          totalMaterials += matSum;
          totalLabor += labSum;
          totalTools += toolSum;
          const calculatedTotal = matSum + labSum + toolSum;
          if (item.total > calculatedTotal) totalMisc += (item.total - calculatedTotal);
        } else {
          totalMisc += item.total;
        }
      });
    });
  });

  return (
    <div className="space-y-6 print:hidden">
      <SummaryCards grandTotal={grandTotal} directCost={directCost} profit={profit} tax={tax} profitRate={project.profitRate} taxRate={project.taxRate} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DistributionChart sortedBreakdown={sortedBreakdown} />
        <ResourceAllocation
          directCost={directCost}
          totalMaterials={totalMaterials}
          totalLabor={totalLabor}
          totalTools={totalTools}
          totalMisc={totalMisc}
          materialPct={directCost > 0 ? (totalMaterials / directCost) * 100 : 0}
          laborPct={directCost > 0 ? (totalLabor / directCost) * 100 : 0}
          toolsPct={directCost > 0 ? (totalTools / directCost) * 100 : 0}
          miscPct={directCost > 0 ? (totalMisc / directCost) * 100 : 0}
        />
      </div>
    </div>
  );
}
