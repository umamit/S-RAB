import { Project } from "../store";

export interface ResourceItem {
  name: string;
  unit: string;
  totalQty: number;
  unitPrice: number;
  totalCost: number;
}

export const aggregateResources = (project: Project) => {
  const materialsMap: Record<string, ResourceItem> = {};
  const laborMap: Record<string, ResourceItem> = {};
  const toolsMap: Record<string, ResourceItem> = {};

  project.subProjects.forEach((sub) => {
    sub.categories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (!item.ahsp) return;
        (item.ahsp.materials || []).forEach((mat) => {
          const key = `${mat.name.toLowerCase()}_${mat.unit.toLowerCase()}`;
          const qty = item.quantity * mat.coefficient;
          const cost = qty * mat.unitPrice;
          if (materialsMap[key]) {
            materialsMap[key].totalQty += qty;
            materialsMap[key].totalCost += cost;
          } else {
            materialsMap[key] = { name: mat.name, unit: mat.unit, totalQty: qty, unitPrice: mat.unitPrice, totalCost: cost };
          }
        });
        (item.ahsp.labor || []).forEach((lab) => {
          const key = `${lab.name.toLowerCase()}_${lab.unit.toLowerCase()}`;
          const qty = item.quantity * lab.coefficient;
          const cost = qty * lab.unitPrice;
          if (laborMap[key]) {
            laborMap[key].totalQty += qty;
            laborMap[key].totalCost += cost;
          } else {
            laborMap[key] = { name: lab.name, unit: lab.unit, totalQty: qty, unitPrice: lab.unitPrice, totalCost: cost };
          }
        });
        (item.ahsp.tools || []).forEach((tool) => {
          const key = `${tool.name.toLowerCase()}_${tool.unit.toLowerCase()}`;
          const qty = item.quantity * tool.coefficient;
          const cost = qty * tool.unitPrice;
          if (toolsMap[key]) {
            toolsMap[key].totalQty += qty;
            toolsMap[key].totalCost += cost;
          } else {
            toolsMap[key] = { name: tool.name, unit: tool.unit, totalQty: qty, unitPrice: tool.unitPrice, totalCost: cost };
          }
        });
      });
    });
  });

  const materials = Object.values(materialsMap).sort((a, b) => b.totalCost - a.totalCost);
  const labor = Object.values(laborMap).sort((a, b) => b.totalCost - a.totalCost);
  const tools = Object.values(toolsMap).sort((a, b) => b.totalCost - a.totalCost);

  return { materials, labor, tools };
};
