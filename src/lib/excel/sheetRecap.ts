import ExcelJS from "exceljs";
import { Project } from "../store";
import { headerFill, footerFill, borderStyle } from "./styles";

export const generateRecapSheet = (
  workbook: ExcelJS.Workbook,
  project: Project,
  subprojectDirectCostRowIndices: Record<string, number>,
  totalDirectRowIndex: number
) => {
  const recapSheet = workbook.addWorksheet("REKAPITULASI");
  recapSheet.views = [{ showGridLines: true }];

  recapSheet.columns = [
    { key: "no", width: 8 },
    { key: "description", width: 55 },
    { key: "amount", width: 30 },
  ];

  recapSheet.addRow([]);
  const rTitleRow = recapSheet.addRow(["REKAPITULASI RENCANA ANGGARAN BIAYA"]);
  rTitleRow.font = { name: "Arial", size: 16, bold: true };
  recapSheet.mergeCells("A2:C2");
  rTitleRow.getCell(1).alignment = { horizontal: "center" };

  const rProjTitle = recapSheet.addRow([project.name]);
  rProjTitle.font = { name: "Arial", size: 12, bold: true, italic: true };
  recapSheet.mergeCells("A3:C3");
  rProjTitle.getCell(1).alignment = { horizontal: "center" };

  if (project.description) {
    const rDesc = recapSheet.addRow([project.description]);
    rDesc.font = { name: "Arial", size: 10, italic: true, color: { argb: "FF64748B" } };
    recapSheet.mergeCells("A4:C4");
    rDesc.getCell(1).alignment = { horizontal: "center" };
  }

  recapSheet.addRow([]);
  recapSheet.addRow([]);

  const rHeaderRow = recapSheet.addRow(["NO.", "URAIAN PEKERJAAN", "JUMLAH BIAYA"]);
  rHeaderRow.height = 28;
  rHeaderRow.eachCell((cell) => {
    cell.font = { name: "Arial", size: 10, bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = headerFill;
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = borderStyle;
  });

  let currentRecapRow = 8;
  const startRecapDataRow = 9;

  project.subProjects.forEach((sub, idx) => {
    const cleanSheetName = sub.name.replace(/[\\*?:/[\]]/g, "_").substring(0, 30);
    const directCostRow = subprojectDirectCostRowIndices[sub.id];
    const subFormula = `'${cleanSheetName}'!G${directCostRow}`;
    
    const row = recapSheet.addRow([
      idx + 1,
      sub.name.toUpperCase(),
      { formula: subFormula }
    ]);
    currentRecapRow++;
    row.height = 24;

    row.eachCell((cell, colIdx) => {
      cell.border = borderStyle;
      cell.font = { name: "Arial", size: 10, bold: true };
      cell.alignment = { vertical: "middle" };
      if (colIdx === 1) cell.alignment = { horizontal: "center", vertical: "middle" };
      if (colIdx === 3) {
        cell.alignment = { horizontal: "right", vertical: "middle" };
        cell.numFmt = '"Rp. "#,##0';
      }
    });
  });

  const endRecapDataRow = currentRecapRow;

  const totalDirectRow = recapSheet.addRow([
    "",
    "JUMLAH PEKERJAAN FISIK MURNI",
    { formula: `SUM(C${startRecapDataRow}:C${endRecapDataRow})` }
  ]);
  currentRecapRow++;

  const profitPercentageLabel = `${(project.profitRate * 100).toFixed(0)}%`;
  const profitRowIndex = totalDirectRowIndex + 1;
  const profitRow = recapSheet.addRow([
    "",
    `JASA KONSTRUKSI & OVERHEAD (${profitPercentageLabel})`,
    { formula: `C${totalDirectRowIndex}*${project.profitRate}` }
  ]);
  currentRecapRow++;

  const taxPercentageLabel = `${(project.taxRate * 100).toFixed(0)}%`;
  const taxRowIndex = totalDirectRowIndex + 2;
  const taxRow = recapSheet.addRow([
    "",
    `PPN (${taxPercentageLabel})`,
    { formula: `(C${totalDirectRowIndex}+C${profitRowIndex})*${project.taxRate}` }
  ]);
  currentRecapRow++;

  const grandTotalRow = recapSheet.addRow([
    "",
    "GRAND TOTAL (DIBULATKAN)",
    { formula: `C${totalDirectRowIndex}+C${profitRowIndex}+C${taxRowIndex}` }
  ]);

  const recapFooters = [totalDirectRow, profitRow, taxRow, grandTotalRow];
  recapFooters.forEach((row, idx) => {
    row.height = 26;
    const isGrand = idx === 3;
    row.eachCell((cell, colIdx) => {
      cell.fill = footerFill;
      cell.border = borderStyle;
      cell.font = { name: "Arial", size: 10, bold: true };
      cell.alignment = { vertical: "middle" };
      if (isGrand) {
        cell.font = { name: "Arial", size: 11, bold: true };
        if (colIdx === 2) cell.font = { name: "Arial", size: 11, bold: true, color: { argb: "FF0F172A" } };
      }
      if (colIdx === 3) {
        cell.alignment = { horizontal: "right", vertical: "middle" };
        cell.numFmt = '"Rp. "#,##0';
      }
    });
  });
};
