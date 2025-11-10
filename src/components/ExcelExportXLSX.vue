<template>
  <button
    @click="downloadExcel"
    class="bg-violet-600 cursor-pointer text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
  >
    <slot>⬇ Download Excel</slot>
  </button>
</template>

<script>
import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

export default {
  name: "ExcelExportXLSX",
  props: {
    data: { type: Object, required: true },
    departments: { type: Array, required: true },
    heads: { type: Array, required: true },
    fields: { type: Object, required: true },
    fileName: { type: String, default: "export.xlsx" },
    totals: { type: Object, required: true },
    deliverables: { type: String, default: "" },
  },

  methods: {
    downloadExcel() {
      const wb = XLSX.utils.book_new();

      // 1️⃣ Budget Worksheet
      this.BudgetWorksheet(wb);

      // 2️⃣ Summary Worksheet
      this.SummaryWorksheet(wb);

      // 3️⃣ Save File
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      saveAs(
        new Blob([wbout], { type: "application/octet-stream" }),
        this.fileName
      );
    },

    // Reusable cell styling
    setCellStyle(ws, cellRef, options = {}) {
      if (!ws[cellRef]) return;
      ws[cellRef].s = {
        alignment: {
          horizontal: "center",
          vertical: "center",
          wrapText: true,
        },
        font: {
          bold: options.bold || false,
          italic: options.italic || false,
          sz: options.size || 11,
          color: { rgb: "FF000000" },
        },
        fill: options.fill ? { fgColor: { rgb: options.fill } } : undefined,
      };
    },

    // Budget Worksheet
    BudgetWorksheet(wb) {
      const wsData = [];

      // Title & Subtitle
      wsData.push([this.data.title]);
      wsData.push([this.data.sub_title]);

      // Table Headers
      const headers = Object.keys(this.fields);
      wsData.push(headers);

      const merges = [];
      let sl = 1;
      const colCount = headers.length;

      // Merge title & subtitle
      merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: colCount - 1 } });
      merges.push({ s: { r: 1, c: 0 }, e: { r: 1, c: colCount - 1 } });

      // Dynamic data rows
      this.data.details.forEach((detail) => {
        const deptName =
          this.departments.find((d) => d.id === detail.department_id)
            ?.department_name || "";
        const startRow = wsData.length;
        const members =
          detail.members && detail.members.length ? detail.members : [{}];

        members.forEach((member) => {
          const row = [];
          Object.keys(this.fields).forEach((key) => {
            const fieldKey = this.fields[key];
            switch (fieldKey) {
              case "SL":
                row.push("");
                break;
              case "Department":
                row.push("");
                break;
              case "Heads":
                row.push(
                  this.heads.find((h) => h.id === member.head_id)?.head_name ||
                    ""
                );
                break;
              case "NoOfUnit":
                row.push(member.unit || "");
                break;
              case "NoOfDays":
                row.push(member.days || "");
                break;
              case "PerDayCost":
                row.push(member.per_day_cost || "");
                break;
              case "UnitCost":
                row.push(member.unit_cost || "");
                break;
              case "TotalCost":
                row.push("");
                break;
              default:
                row.push("");
            }
          });
          wsData.push(row);
        });

        const endRow = wsData.length - 1;
        wsData[startRow][0] = sl++;
        wsData[startRow][1] = deptName;
        wsData[startRow][colCount - 1] = detail.total_cost || "";

        if (members.length > 1) {
          merges.push({ s: { r: startRow, c: 0 }, e: { r: endRow, c: 0 } });
          merges.push({ s: { r: startRow, c: 1 }, e: { r: endRow, c: 1 } });
          merges.push({
            s: { r: startRow, c: colCount - 1 },
            e: { r: endRow, c: colCount - 1 },
          });
        }

        wsData.push([]);
      });

      // Total Cost row
      const totalRowIndex = wsData.length;
      const totalRow = new Array(colCount).fill("");
      totalRow[0] = "Total Cost";
      totalRow[colCount - 1] = this.totals.total_cost || "";
      wsData.push(totalRow);
      merges.push({
        s: { r: totalRowIndex, c: 0 },
        e: { r: totalRowIndex, c: 2 },
      });

      // Deliverables
      const deliverableRowIndex = wsData.length + 2;
      const deliverableRow = new Array(colCount).fill("");
      deliverableRow[0] = this.deliverables || "";
      wsData.push([]);
      wsData.push([]);
      wsData.push(deliverableRow);
      merges.push({
        s: { r: deliverableRowIndex, c: 0 },
        e: { r: deliverableRowIndex, c: colCount - 1 },
      });

      const ws = XLSX.utils.aoa_to_sheet(wsData);
      ws["!merges"] = merges;

      ws["!cols"] = headers.map((_, index) => {
        if (index === 0) return { wch: 5 };
        else if (index === 1 || index === 2) return { wch: 25 };
        return { wch: 15 };
      });

      // Apply styling
      for (let r = 0; r < wsData.length; r++) {
        for (let c = 0; c < colCount; c++) {
          const cell = XLSX.utils.encode_cell({ r, c });
          let options = {};

          // Title row
          if (r === 0) options = { bold: true, size: 13, fill: "E0E0E0" };
          // Subtitle row
          else if (r === 1)
            options = { italic: true, size: 12, fill: "F5F5F5" };
          // Header row
          else if (r === 2) options = { bold: true, fill: "D9E1F2" };
          // Total Cost row
          else if (r === totalRowIndex)
            options = { bold: true, fill: "FFF2CC" };
          // Deliverables row
          else if (r === deliverableRowIndex)
            options = { italic: true, fill: "E2EFDA" };

          this.setCellStyle(ws, cell, options);
        }
      }

      XLSX.utils.book_append_sheet(wb, ws, "Budget");
    },

    // Summary Worksheet
    SummaryWorksheet(wb) {
      const wsData = [
        ["Department Summary"],
        ["Generated On:", new Date().toLocaleString()],
        [],
        ["SL", "Department", "Total Members", "Total Days", "Total Cost"], // Headers
      ];

      let sl = 1;
      let grandTotalUnits = 0;
      let grandTotalDays = 0;
      let grandTotalCost = 0;

      this.data.details.forEach((detail) => {
        const deptName =
          this.departments.find((d) => d.id === detail.department_id)
            ?.department_name || "";

        const totalUnits =
          detail.members?.reduce((sum, m) => sum + (m.unit || 0), 0) || 0;
        const totalDays =
          detail.members?.reduce((sum, m) => sum + (m.days || 0), 0) || 0;
        const totalCost = detail.total_cost || 0;

        grandTotalUnits += totalUnits;
        grandTotalDays += totalDays;
        grandTotalCost += totalCost;

        wsData.push([sl++, deptName, totalUnits, totalDays, totalCost]);
      });

      // Total row
      const totalRowIndex = wsData.length;
      wsData.push([
        "Total",
        "",
        grandTotalUnits,
        grandTotalDays,
        grandTotalCost,
      ]);

      const ws = XLSX.utils.aoa_to_sheet(wsData);

      // Column widths
      ws["!cols"] = [
        { wch: 15 }, // SL
        { wch: 30 }, // Department
        { wch: 15 }, // Total Members
        { wch: 15 }, // Total Days
        { wch: 15 }, // Total Cost
      ];

      // Merge title row
      ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];

      // Apply styling similar to Budget
      const lastRow = wsData.length - 1;
      for (let c = 0; c < 5; c++) {
        // Title
        this.setCellStyle(ws, XLSX.utils.encode_cell({ r: 0, c }), {
          bold: true,
          size: 13,
          fill: "E0E0E0",
        });
        // Subtitle
        this.setCellStyle(ws, XLSX.utils.encode_cell({ r: 1, c }), {
          italic: true,
          size: 12,
          fill: "F5F5F5",
        });
        // Headers
        this.setCellStyle(ws, XLSX.utils.encode_cell({ r: 3, c }), {
          bold: true,
          fill: "D9E1F2",
        });
        // Total row highlight
        this.setCellStyle(ws, XLSX.utils.encode_cell({ r: lastRow, c }), {
          bold: true,
          fill: "FFF2CC",
        });
      }

      // Center all data cells
      Object.keys(ws).forEach((cell) => {
        if (cell[0] === "!") return;
        ws[cell].s = ws[cell].s || {};
        ws[cell].s.alignment = { horizontal: "center", vertical: "center" };
      });

      XLSX.utils.book_append_sheet(wb, ws, "Summary");
    },
  },
};
</script>
