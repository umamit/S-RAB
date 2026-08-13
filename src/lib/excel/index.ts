import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Project } from "../store";
import { generateRecapSheet } from "./sheetRecap";
import { generateRABSheet } from "./sheetRAB";
import { generateResourceSheet } from "./sheetResource";

export { formatRupiah } from "./formatters";

export const exportProjectToExcel = async (project: Project) => {
  const workbook = new ExcelJS.Workbook();

  // Pre-calculate sheet structures to know the direct cost row index for each sub-project
  const subprojectDirectCostRowIndices: Record<string, number> = {};
  project.subProjects.forEach((sub) => {
    let rowCount = 8; // table header is row 8
    sub.categories.forEach((category) => {
      rowCount++; // Category header
      rowCount += category.items.length; // Items
      rowCount++; // Category subtotal
    });
    subprojectDirectCostRowIndices[sub.id] = rowCount + 1; // Direct Cost row index
  });

  const totalDirectRowIndex = 8 + project.subProjects.length + 1;

  // 1. REKAPITULASI SHEET
  generateRecapSheet(workbook, project, subprojectDirectCostRowIndices, totalDirectRowIndex);

  // 2. INDIVIDUAL SUB-PROJECT SHEETS
  project.subProjects.forEach((subProject) => {
    generateRABSheet(workbook, project, subProject, totalDirectRowIndex);
  });

  // 3. DAFTAR BAHAN & UPAH SHEET
  generateResourceSheet(workbook, project);

  // Export buffer to file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, `RAB_${project.name.replace(/\s+/g, "_")}.xlsx`);
};
