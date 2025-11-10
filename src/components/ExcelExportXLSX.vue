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
      const wsData = [];

      // 1️⃣ Title & Subtitle
      wsData.push([this.data.title]);
      wsData.push([this.data.sub_title]);

      // 2️⃣ Table Headers
      const headers = Object.keys(this.fields);
      wsData.push(headers);

      const merges = [];
      let sl = 1;
      const colCount = headers.length;

      // Merge title & subtitle across all columns
      merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: colCount - 1 } });
      merges.push({ s: { r: 1, c: 0 }, e: { r: 1, c: colCount - 1 } });

      // 3️⃣ Dynamic Data Rows
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
                const headName =
                  this.heads.find((h) => h.id === member.head_id)?.head_name ||
                  "";
                row.push(headName);
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

        // Fill department-level cells
        wsData[startRow][0] = sl++;
        wsData[startRow][1] = deptName;
        wsData[startRow][colCount - 1] = detail.total_cost || "";

        // Merge department-level cells across member rows
        if (members.length > 1) {
          merges.push({ s: { r: startRow, c: 0 }, e: { r: endRow, c: 0 } });
          merges.push({ s: { r: startRow, c: 1 }, e: { r: endRow, c: 1 } });
          merges.push({
            s: { r: startRow, c: colCount - 1 },
            e: { r: endRow, c: colCount - 1 },
          });
        }

        // Add empty row for spacing
        wsData.push([]);
      });

      // ✅ 4️⃣ Add "Total Cost" Row
      const totalRowIndex = wsData.length;
      const totalRow = new Array(colCount).fill("");
      totalRow[0] = "Total Cost"; // Label
      totalRow[colCount - 1] = this.totals.total_cost || "";
      wsData.push(totalRow);

      // Merge (SL, Department, Heads)
      merges.push({
        s: { r: totalRowIndex, c: 0 },
        e: { r: totalRowIndex, c: 2 },
      });

      // ✅ Add 2 blank rows gap
      wsData.push([]);
      wsData.push([]);

      // ✅ Add Deliverables row
      const deliverableRowIndex = wsData.length;
      const deliverableRow = new Array(colCount).fill("");
      deliverableRow[0] = this.deliverables || "";
      wsData.push(deliverableRow);

      // Merge all columns for deliverables
      merges.push({
        s: { r: deliverableRowIndex, c: 0 },
        e: { r: deliverableRowIndex, c: colCount - 1 },
      });

      // 5️⃣ Create Worksheet
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      ws["!merges"] = merges;

      // 6️⃣ Column Widths
      ws["!cols"] = headers.map(() => ({ wch: 18 }));

      // Helper to set cell style
      const setStyle = (cellRef, options = {}) => {
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
      };

      // 🎨 Apply Styles
      const colCountCells = headers.length;

      // Title
      for (let i = 0; i < colCountCells; i++) {
        const cell = XLSX.utils.encode_cell({ r: 0, c: i });
        setStyle(cell, { bold: true, size: 16, fill: "E0E0E0" });
      }

      // Subtitle
      for (let i = 0; i < colCountCells; i++) {
        const cell = XLSX.utils.encode_cell({ r: 1, c: i });
        setStyle(cell, { italic: true, size: 12, fill: "F5F5F5" });
      }

      // Headers
      headers.forEach((_, i) => {
        const cell = XLSX.utils.encode_cell({ r: 2, c: i });
        setStyle(cell, { bold: true, fill: "D9E1F2" });
      });

      // Center all data cells
      Object.keys(ws).forEach((cell) => {
        if (cell[0] === "!") return;
        ws[cell].s = ws[cell].s || {};
        ws[cell].s.alignment = {
          horizontal: "center",
          vertical: "center",
        };
      });

      // ✅ Style Total Cost row
      for (let i = 0; i < colCount; i++) {
        const cell = XLSX.utils.encode_cell({ r: totalRowIndex, c: i });
        setStyle(cell, { bold: true, fill: "FFF2CC" });
      }

      // ✅ Style Deliverables row
      for (let i = 0; i < colCount; i++) {
        const cell = XLSX.utils.encode_cell({ r: deliverableRowIndex, c: i });
        setStyle(cell, { italic: true, fill: "E2EFDA" });
      }

      // 7️⃣ Append & Save File
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
