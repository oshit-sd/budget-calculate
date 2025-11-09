<template>
  <button
    @click="downloadExcel"
    class="bg-violet-600 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
  >
    <slot>⬇ Download Excel</slot>
  </button>
</template>

<script>
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default {
  name: "ExcelExportXLSX",
  props: {
    details: { type: Array, required: true },
    departments: { type: Array, required: true },
    fileName: { type: String, default: "export.xlsx" },
    title: {
      type: String,
      default: "Mobile Game Development Budget Calculator",
    },
    subTitle: {
      type: String,
      default: "Estimate your mobile game development costs easily",
    },
  },
  methods: {
    downloadExcel() {
      const wb = XLSX.utils.book_new();
      const wsData = [];

      // 1. Title & Subtitle
      wsData.push([this.title]);
      wsData.push([this.subTitle]);

      // 2. Table Headers
      wsData.push([
        "Sl",
        "Department",
        "Head",
        "Units",
        "Days",
        "Per Day Cost",
        "Unit Cost",
        "Total Cost",
      ]);

      const merges = [];
      let sl = 1;

      // Merge Title & Subtitle across all 8 columns (A-H)
      merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } });
      merges.push({ s: { r: 1, c: 0 }, e: { r: 1, c: 7 } });

      // Add department data
      this.details.forEach((detail) => {
        const deptName =
          this.departments.find((d) => d.id === detail.department_id)?.name ||
          "";
        const startRow = wsData.length;
        const members =
          detail.members && detail.members.length ? detail.members : [{}];

        // Add member rows
        members.forEach((member) => {
          wsData.push([
            "",
            "", // Sl, Department
            member.user_id || "",
            member.unit || "",
            member.days || "",
            member.per_day_cost || "",
            member.unit_cost || "",
            "", // Total Cost
          ]);
        });

        const endRow = wsData.length - 1;

        // Fill first row of department
        wsData[startRow][0] = sl++;
        wsData[startRow][1] = deptName;
        wsData[startRow][7] = detail.total_cost || "";

        // Merge Sl, Department, Total Cost for multiple members
        if (members.length > 1) {
          merges.push({ s: { r: startRow, c: 0 }, e: { r: endRow, c: 0 } });
          merges.push({ s: { r: startRow, c: 1 }, e: { r: endRow, c: 1 } });
          merges.push({ s: { r: startRow, c: 7 }, e: { r: endRow, c: 7 } });
        }

        // Extra gap row after department
        wsData.push([]);
      });

      const ws = XLSX.utils.aoa_to_sheet(wsData);
      ws["!merges"] = merges;

      // Column widths
      ws["!cols"] = [
        { wch: 5 },
        { wch: 25 },
        { wch: 25 },
        { wch: 12 },
        { wch: 10 },
        { wch: 15 },
        { wch: 12 },
        { wch: 12 },
      ];

      // Helper to style a cell: center + bold
      const styleCell = (cell, bold = false) => {
        if (!ws[cell]) return;
        ws[cell].s = ws[cell].s || {};
        ws[cell].s.alignment = { horizontal: "center", vertical: "center" };
        if (bold) ws[cell].s.font = { bold: true, color: { rgb: "FF000000" } };
      };

      // Title & Subtitle bold + centered
      styleCell("A1", true);
      styleCell("A2", true);

      // Table headers bold + centered
      ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3"].forEach((cell) =>
        styleCell(cell, true)
      );

      // Center merged department cells
      let currentRow = 4;
      this.details.forEach((detail) => {
        const memberCount = detail.members.length;
        styleCell(`A${currentRow}`);
        styleCell(`B${currentRow}`);
        styleCell(`H${currentRow}`);
        currentRow += memberCount + 1; // skip gap row
      });

      // Center all other cells
      Object.keys(ws).forEach((cell) => {
        if (cell[0] === "!") return;
        if (!ws[cell].s) ws[cell].s = {};
        if (!ws[cell].s.alignment) ws[cell].s.alignment = {};
        ws[cell].s.alignment.horizontal =
          ws[cell].s.alignment.horizontal || "center";
        ws[cell].s.alignment.vertical =
          ws[cell].s.alignment.vertical || "center";
      });

      XLSX.utils.book_append_sheet(wb, ws, "Budget");
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      saveAs(
        new Blob([wbout], { type: "application/octet-stream" }),
        this.fileName
      );
    },
  },
};
</script>
