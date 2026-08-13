import ExcelJS from "exceljs";
import { borderStyle } from "./styles";

export const styleItemRow = (itemRow: ExcelJS.Row) => {
  itemRow.height = 20;
  itemRow.eachCell((cell, colNumber) => {
    cell.border = borderStyle;
    cell.font = { name: "Arial", size: 10 };
    cell.alignment = { vertical: "middle" };

    if (colNumber === 1 || colNumber === 3) {
      cell.alignment = { horizontal: "center", vertical: "middle" };
    } else if (colNumber === 4) {
      cell.alignment = { horizontal: "right", vertical: "middle" };
      cell.numFmt = "#,##0.00";
    } else if (colNumber === 5 || colNumber === 7) {
      cell.alignment = { horizontal: "right", vertical: "middle" };
      cell.numFmt = '"Rp. "#,##0';
    } else if (colNumber === 6) {
      cell.alignment = { horizontal: "right", vertical: "middle" };
      cell.numFmt = "0.00%";
    }
  });
};

export const styleSubtotalRow = (subtotalRow: ExcelJS.Row, categoryFill: ExcelJS.Fill) => {
  subtotalRow.height = 22;
  subtotalRow.eachCell((cell, colIdx) => {
    cell.font = { name: "Arial", size: 10, bold: true };
    cell.fill = categoryFill;
    cell.border = borderStyle;
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
