import ExcelJS from "exceljs";
import { Project } from "../store";
import { headerFill, categoryFill, borderStyle } from "./styles";
import { aggregateResources, ResourceItem } from "./resourceAggregator";

export const generateResourceSheet = (
  workbook: ExcelJS.Workbook,
  project: Project
) => {
  const resourceSheet = workbook.addWorksheet("BAHAN & UPAH");
  resourceSheet.views = [{ showGridLines: true }];

  resourceSheet.columns = [
    { key: "no", width: 8 },
    { key: "name", width: 45 },
    { key: "qty", width: 18 },
    { key: "unit", width: 12 },
    { key: "price", width: 22 },
    { key: "total", width: 28 },
  ];

  resourceSheet.addRow([]);
  const resTitleRow = resourceSheet.addRow(["DAFTAR KEBUTUHAN BAHAN & UPAH (REKAPITULASI)"]);
  resTitleRow.font = { name: "Arial", size: 14, bold: true };
  resourceSheet.mergeCells("A2:F2");
  resTitleRow.getCell(1).alignment = { horizontal: "center" };

  const resProjRow = resourceSheet.addRow([project.name]);
  resProjRow.font = { name: "Arial", size: 11, bold: true, italic: true };
  resourceSheet.mergeCells("A3:F3");
  resProjRow.getCell(1).alignment = { horizontal: "center" };

  resourceSheet.addRow([]);
  resourceSheet.addRow([]);

  const { materials, labor, tools } = aggregateResources(project);
  let currentResourceRowIdx = 6;

  const addResourceSection = (title: string, list: ResourceItem[], sectionColorHex: string) => {
    const secHead = resourceSheet.addRow(["", title.toUpperCase(), "", "", "", ""]);
    secHead.height = 24;
    resourceSheet.mergeCells(`B${currentResourceRowIdx}:E${currentResourceRowIdx}`);
    secHead.eachCell((cell) => {
      cell.font = { name: "Arial", size: 10, bold: true };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: sectionColorHex } };
      cell.border = borderStyle;
    });
    currentResourceRowIdx++;

    const tableHeader = resourceSheet.addRow(["NO.", "URAIAN", "VOLUME", "SATUAN", "HARGA DASAR", "TOTAL BIAYA"]);
    tableHeader.height = 20;
    tableHeader.eachCell((cell) => {
      cell.font = { name: "Arial", size: 9, bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = headerFill;
      cell.border = borderStyle;
      cell.alignment = { vertical: "middle" };
    });
    currentResourceRowIdx++;

    const startIdx = currentResourceRowIdx;

    list.forEach((item, index) => {
      const row = resourceSheet.addRow([
        index + 1, item.name, item.totalQty, item.unit, item.unitPrice,
        { formula: `C${currentResourceRowIdx}*E${currentResourceRowIdx}` },
      ]);
      row.height = 20;
      row.eachCell((cell, colIdx) => {
        cell.font = { name: "Arial", size: 9 };
        cell.border = borderStyle;
        cell.alignment = { vertical: "middle" };
        if (colIdx === 3) {
          cell.alignment = { horizontal: "right", vertical: "middle" };
          cell.numFmt = "#,##0.000";
        } else if (colIdx === 4) {
          cell.alignment = { horizontal: "center", vertical: "middle" };
        } else if (colIdx === 5) {
          cell.alignment = { horizontal: "right", vertical: "middle" };
          cell.numFmt = '"Rp. "#,##0';
        } else if (colIdx === 6) {
          cell.alignment = { horizontal: "right", vertical: "middle" };
          cell.numFmt = '"Rp. "#,##0';
          cell.font = { name: "Arial", size: 9, bold: true };
        }
      });
      currentResourceRowIdx++;
    });

    const endIdx = currentResourceRowIdx - 1;
    const subtotalRow = resourceSheet.addRow([
      "", `TOTAL BIAYA ${title.toUpperCase()}`, "", "", "",
      list.length > 0 ? { formula: `SUM(F${startIdx}:F${endIdx})` } : 0,
    ]);
    subtotalRow.height = 22;
    subtotalRow.eachCell((cell, colIdx) => {
      cell.font = { name: "Arial", size: 9, bold: true };
      cell.fill = categoryFill;
      cell.border = borderStyle;
      cell.alignment = { vertical: "middle" };
      if (colIdx === 6) {
        cell.alignment = { horizontal: "right", vertical: "middle" };
        cell.numFmt = '"Rp. "#,##0';
      }
    });
    currentResourceRowIdx++;
    resourceSheet.addRow([]);
    currentResourceRowIdx++;
  };

  if (materials.length > 0) addResourceSection("Kebutuhan Bahan (Material)", materials, "FFE0F2FE");
  if (labor.length > 0) addResourceSection("Kebutuhan Upah Kerja (Tenaga Kerja)", labor, "FEFEF3C7");
  if (tools.length > 0) addResourceSection("Kebutuhan Sewa Alat (Peralatan)", tools, "FFD1FAE5");
};
