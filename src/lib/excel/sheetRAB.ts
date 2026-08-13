import ExcelJS from "exceljs";
import { Project, SubProject } from "../store";
import { headerFill, categoryFill, footerFill, borderStyle } from "./styles";
import { styleItemRow, styleSubtotalRow } from "./rabRowStyle";

export const generateRABSheet = (
  workbook: ExcelJS.Workbook,
  project: Project,
  subProject: SubProject,
  totalDirectRowIndex: number
) => {
  const cleanSheetName = subProject.name.replace(/[\\*?:/[\]]/g, "_").substring(0, 30);
  const worksheet = workbook.addWorksheet(cleanSheetName);
  worksheet.views = [{ showGridLines: true }];

  worksheet.columns = [
    { key: "no", width: 8 },
    { key: "description", width: 45 },
    { key: "unit", width: 12 },
    { key: "quantity", width: 12 },
    { key: "unitPrice", width: 22 },
    { key: "weight", width: 15 },
    { key: "totalPrice", width: 25 },
  ];

  worksheet.addRow([]);
  const titleRow = worksheet.addRow(["RAB DETIL - " + subProject.name.toUpperCase()]);
  titleRow.font = { name: "Arial", size: 14, bold: true };
  worksheet.mergeCells("A2:G2");
  titleRow.getCell(1).alignment = { horizontal: "center" };

  const projectTitleRow = worksheet.addRow([project.name]);
  projectTitleRow.font = { name: "Arial", size: 11, bold: true, italic: true };
  worksheet.mergeCells("A3:G3");
  projectTitleRow.getCell(1).alignment = { horizontal: "center" };

  worksheet.addRow([]);
  worksheet.addRow([]);
  worksheet.addRow([]);

  const headerRow = worksheet.addRow([
    "NO.", "URAIAN PEKERJAAN", "SATUAN", "VOLUME", "HARGA SATUAN", "BOBOT (%)", "JUMLAH HARGA",
  ]);
  headerRow.height = 28;
  headerRow.eachCell((cell) => {
    cell.font = { name: "Arial", size: 10, bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = headerFill;
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = borderStyle;
  });

  const categorySubtotalRows: number[] = [];
  let currentItemRowIndex = 8;

  subProject.categories.forEach((category) => {
    const catRow = worksheet.addRow(["", category.name, "", "", "", "", ""]);
    currentItemRowIndex++;
    catRow.height = 24;
    catRow.getCell(2).font = { name: "Arial", size: 10, bold: true };
    catRow.eachCell((cell) => {
      cell.fill = categoryFill;
      cell.border = borderStyle;
      cell.alignment = { vertical: "middle" };
    });

    const startRowIndex = currentItemRowIndex + 1;

    category.items.forEach((item, index) => {
      worksheet.addRow([
        index + 1, item.name, item.unit, item.quantity, item.unitPrice,
        { formula: `G${currentItemRowIndex + 1}/REKAPITULASI!$C$${totalDirectRowIndex}` },
        { formula: `D${currentItemRowIndex + 1}*E${currentItemRowIndex + 1}` },
      ]);
      currentItemRowIndex++;
      styleItemRow(worksheet.getRow(currentItemRowIndex));
    });

    const endRowIndex = currentItemRowIndex;
    const subtotalRowIndex = currentItemRowIndex + 1;
    categorySubtotalRows.push(subtotalRowIndex);

    const subtotalLabel = `SUB TOTAL ${category.name.substring(category.name.indexOf(" ") + 1)}`;
    const subtotalRow = worksheet.addRow([
      "", subtotalLabel.toUpperCase(), "", "", "",
      category.items.length > 0 ? { formula: `SUM(F${startRowIndex}:F${endRowIndex})` } : 0,
      category.items.length > 0 ? { formula: `SUM(G${startRowIndex}:G${endRowIndex})` } : 0,
    ]);
    currentItemRowIndex++;
    styleSubtotalRow(subtotalRow, categoryFill);
  });

  const directSumFormula = categorySubtotalRows.length > 0 ? categorySubtotalRows.map(row => `G${row}`).join("+") : "0";
  const weightSumFormula = categorySubtotalRows.length > 0 ? categorySubtotalRows.map(row => `F${row}`).join("+") : "0";

  const subProjectDirectCostRow = worksheet.addRow([
    "", "JUMLAH PEKERJAAN FISIK " + subProject.name.toUpperCase(), "", "", "",
    { formula: weightSumFormula },
    { formula: directSumFormula },
  ]);

  subProjectDirectCostRow.height = 24;
  subProjectDirectCostRow.eachCell((cell, colIdx) => {
    cell.fill = footerFill;
    cell.border = borderStyle;
    cell.font = { name: "Arial", size: 10, bold: true };
    cell.alignment = { vertical: "middle" };
    if (colIdx === 7) {
      cell.alignment = { horizontal: "right", vertical: "middle" };
      cell.numFmt = '"Rp. "#,##0';
    } else if (colIdx === 6) {
      cell.alignment = { horizontal: "right", vertical: "middle" };
      cell.numFmt = "0.00%";
    }
  });
};
