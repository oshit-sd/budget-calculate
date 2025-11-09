<template>
  <download-excel
    :data="flattenedData"
    :fields="fields"
    :header="header"
    :name="fileName"
    class="bg-violet-600 text-white px-4 py-2 rounded-md cursor-pointer inline-block"
  >
    <slot>⬇ Download Excel</slot>
  </download-excel>
</template>

<script>
import DownloadExcel from "vue-json-excel3";

export default {
  name: "ExcelExport",
  components: { DownloadExcel },
  props: {
    details: { type: Array, required: true },
    departments: { type: Array, required: true },
    heads: { type: Array, required: true },
    fileName: { type: String, default: "export.xlsx" },
    fields: { type: Object, required: true },
    header: { type: [String, Array], default: () => [] },
    totals: { type: Object, required: true },
    deliverables: { type: String, default: "" },
  },
  computed: {
    flattenedData() {
      const result = [];
      let sl = 1;

      if (!Array.isArray(this.details) || this.details.length === 0) return [];

      // Flatten department members
      this.details.forEach((detail) => {
        const deptName =
          this.departments.find((d) => d.id === detail.department_id)
            ?.department_name || "";

        if (!Array.isArray(detail.members) || detail.members.length === 0) {
          result.push({
            SL: sl++,
            Department: deptName,
            Heads: "",
            NoOfUnit: "",
            NoOfDays: "",
            PerDayCost: "",
            UnitCost: "",
            TotalCost: detail.total_cost || "",
          });
        } else {
          detail.members.forEach((member, index) => {
            const headName =
              this.heads.find((d) => d.id === member.head_id)?.head_name || "";

            result.push({
              SL: index === 0 ? sl++ : "",
              Department: index === 0 ? deptName : "",
              Heads: headName || "",
              NoOfUnit: member.unit || "",
              NoOfDays: member.days || "",
              PerDayCost: member.per_day_cost || "",
              UnitCost: member.unit_cost || "",
              TotalCost: index === 0 ? detail.total_cost || "" : "",
            });
          });
        }

        // Add blank row after each department for spacing
        result.push({});
      });

      // Totals row
      if (this.totals && this.totals.total_cost !== undefined) {
        result.push({
          SL: "",
          Department: "Total Cost",
          TotalCost: this.totals.total_cost,
        });
      }

      result.push({});

      if (this.deliverables) {
        const deliverableRow = {};
        const firstKey = Object.keys(this.fields)[0];
        deliverableRow[firstKey] = `Deliverables: ${this.deliverables}`;
        Object.keys(this.fields).forEach((key) => {
          if (key !== firstKey) deliverableRow[key] = "";
        });
        result.push(deliverableRow);
      }

      return result;
    },
  },
};
</script>
