<template>
  <div>
    <PageTitle title="Budget Calculate">
      <template #actions>
        <ExcelExportXLSX
          v-if="formData.total_cost"
          :heads="heads"
          :fields="excel_fields"
          :data="formData"
          :departments="departments"
          :remarks="formData.remarks"
          :totals="totals"
          file-name="budget.xlsx"
        >
        </ExcelExportXLSX>

        <button
          v-if="formData.total_cost"
          type="button"
          class="bg-lime-600 hover:bg-lime-700 text-white cursor-pointer px-4 py-2 rounded-lg shadow-md transition-all"
          @click="submit"
        >
          Save
        </button>
      </template>
    </PageTitle>

    <!-- Table Container -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="py-2 px-3">
        <div class="flex items-center gap-2">
          <span class="text-gray-700 text-sm font-medium">Template:</span>
          <select
            v-model="formData.template_id"
            class="border border-slate-400 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">--Select a template--</option>
            <option v-for="(item, key) in templates" :key="key" :value="key">
              {{ item.template_name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Header -->
      <div class="rounded-lg pb-4">
        <!-- Main Title -->
        <div class="text-center">
          <input
            v-model="formData.title"
            type="text"
            class="text-xl font-bold text-slate-900 w-full text-center bg-transparent focus:ring-2 focus:ring-violet-500 rounded-md"
          />
        </div>

        <!-- Subtitle -->
        <div class="text-center">
          <input
            v-model="formData.sub_title"
            type="text"
            class="text-md text-slate-600 font-medium w-full text-center bg-transparent focus:ring-2 focus:ring-violet-500 rounded-md"
          />
        </div>
      </div>

      <!-- table sections -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-200 text-slate-800">
              <th class="px-4 py-2 text-center text-sm font-bold uppercase">
                Sl.
              </th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Departments
              </th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Heads
              </th>
              <th class="px-4 py-2 text-center text-sm font-bold uppercase">
                No. of Unit
              </th>
              <th class="px-4 py-2 text-center text-sm font-bold uppercase">
                No. of Days
              </th>
              <th class="px-4 py-2 text-center text-sm font-bold uppercase">
                Per Day Cost
              </th>
              <th class="px-4 py-2 text-center text-sm font-bold uppercase">
                Unit Cost
              </th>
              <th class="px-4 py-2 text-center text-sm font-semibold"></th>
              <th class="px-4 py-2 text-center text-sm font-bold uppercase">
                Total Cost
              </th>
              <th class="px-4 py-2 text-center text-sm font-semibold"></th>
            </tr>
          </thead>

          <tbody>
            <template
              v-for="(detail, deptIndex) in formData.details"
              :key="deptIndex"
            >
              <tr
                v-for="(member, mIndex) in detail.members"
                :key="mIndex"
                class="hover:bg-slate-50 transition-colors"
              >
                <!-- Serial -->
                <td
                  v-if="mIndex === 0"
                  :rowspan="detail.members.length"
                  class="px-4 py-1 text-sm font-medium text-slate-900 text-center align-middle border border-slate-200"
                >
                  {{ deptIndex + 1 }}
                </td>

                <!-- Department Dropdown -->
                <td
                  v-if="mIndex === 0"
                  :rowspan="detail.members.length"
                  class="px-4 py-1 text-sm text-slate-700 align-middle border border-slate-200"
                >
                  <select
                    v-model="detail.department_id"
                    class="w-full bg-transparent text-slate-900 font-medium focus:ring-2 focus:ring-violet-500 rounded-md"
                  >
                    <option value="">--Select Department--</option>
                    <option
                      v-for="dept in departments"
                      :key="dept.id"
                      :value="dept.id"
                      :disabled="
                        isDepartmentSelected(dept.id) &&
                        detail.department_id !== dept.id
                      "
                    >
                      {{ dept.department_name }}
                    </option>
                  </select>
                </td>

                <!-- Member Dropdown -->
                <td
                  class="px-4 py-1 text-sm text-slate-700 border border-slate-200"
                >
                  <select
                    @change="selectHeads($event.target.value, detail, member)"
                    v-model="member.head_id"
                    class="w-full bg-transparent text-slate-900 font-medium focus:ring-2 focus:ring-violet-500 rounded-md"
                  >
                    <option value="">--Select Head--</option>
                    <option
                      v-for="des in getHeads(detail.department_id)"
                      :key="des.head"
                      :value="des.id"
                      :disabled="
                        isHeadSelected(des.id, detail.members) &&
                        member.head_id !== des.id
                      "
                    >
                      {{ des.head_name }}
                    </option>
                  </select>
                </td>

                <!-- Units -->
                <td class="px-2 py-1 text-center border border-slate-200">
                  <input
                    type="number"
                    min="0"
                    v-model.number="member.unit"
                    @input="calculateTotal(detail, member)"
                    @focus="(e) => e.target.select()"
                    class="text-center w-20 text-sm bg-transparent focus:ring-2 focus:ring-violet-500 rounded-md"
                  />
                </td>

                <!-- Days -->
                <td class="px-2 py-1 text-center border border-slate-200">
                  <input
                    type="number"
                    min="0"
                    v-model.number="member.days"
                    @input="calculateTotal(detail, member)"
                    @focus="(e) => e.target.select()"
                    class="text-center w-20 text-sm bg-transparent focus:ring-2 focus:ring-violet-500 rounded-md"
                  />
                </td>

                <!-- Per Day Cost -->
                <td class="px-2 py-1 text-center border border-slate-200">
                  <input
                    type="number"
                    min="0"
                    v-model.number="member.per_day_cost"
                    @input="calculateTotal(detail, member)"
                    @focus="(e) => e.target.select()"
                    class="text-center w-24 text-sm bg-transparent focus:ring-2 focus:ring-violet-500 rounded-md"
                  />
                </td>

                <!-- Unit Cost -->
                <td
                  class="px-4 py-1 text-sm text-center text-slate-800 border border-slate-200"
                >
                  {{ member.unit_cost || "-" }}
                </td>

                <!-- Actions -->
                <td
                  class="px-3 py-1 flex justify-between border border-slate-200 text-sm"
                >
                  <button
                    v-if="detail.members.length > 1"
                    class="text-red-500 hover:text-red-700 me-3 font-semibold text-xl cursor-pointer"
                    @click="removeMember(deptIndex, mIndex)"
                  >
                    ×
                  </button>
                  <button
                    v-if="detail.members.length == mIndex + 1"
                    class="text-violet-600 hover:text-violet-800 font-semibold text-xl cursor-pointer"
                    @click="addMember(deptIndex)"
                  >
                    +
                  </button>
                </td>

                <!-- Total Cost -->
                <td
                  v-if="mIndex === 0"
                  :rowspan="detail.members.length"
                  class="px-4 py-1 text-sm text-center text-slate-800 border border-slate-200"
                >
                  {{ detail.total_cost || "-" }}
                </td>

                <!-- Actions -->
                <td
                  v-if="mIndex === 0"
                  :rowspan="detail.members.length"
                  class="px-4 py-1 text-center text-sm border border-slate-200"
                >
                  <button
                    v-if="formData.details.length > 1"
                    class="text-red-500 hover:text-red-700 font-semibold text-xl cursor-pointer"
                    @click="this.formData.details.splice(deptIndex, 1)"
                  >
                    ×
                  </button>
                </td>
              </tr>

              <tr>
                <td colspan="20" class="py-2"></td>
              </tr>
            </template>

            <tr class="hover:bg-slate-50 transition-colors">
              <td
                colspan="3"
                class="px-4 py-2 text-center text-sm font-bold uppercase border border-slate-200"
              >
                Total
              </td>
              <td
                class="px-4 py-2 text-sm font-medium text-slate-900 text-center align-middle border border-slate-200"
              >
                {{ totals.total_unit || "-" }}
              </td>
              <td
                class="px-4 py-2 text-sm font-medium text-slate-900 text-center align-middle border border-slate-200"
              >
                {{ totals.total_days || "-" }}
              </td>
              <td colspan="3" class="px-4 border border-slate-200"></td>
              <td
                class="px-4 py-2 text-sm font-medium text-slate-900 text-center align-middle border border-slate-200"
              >
                {{ totals.total_cost || "-" }}
              </td>
              <td class="px-4 border border-slate-200"></td>
            </tr>

            <!-- Add New Department -->
            <tr>
              <td
                colspan="20"
                class="py-2 border-t border-gray-200 text-center"
              >
                <button
                  class="flex items-center justify-center gap-2 text-violet-600 hover:text-violet-800 font-semibold text-sm px-4 py-2 rounded-md hover:bg-violet-50 cursor-pointer mx-auto"
                  @click="addDepartment"
                >
                  <span class="text-xl">+</span>
                  <span>Add New Department</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- remarks -->
      <div class="p-6">
        <div class="flex items-start space-x-4 text-sm">
          <textarea
            v-model="formData.remarks"
            class="flex-1 border border-gray-300 focus:ring-2 focus:ring-violet-500 rounded-md resize-none p-1 text-slate-700"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defaultDepartments, defaultHeads } from "@/data/defaults";

import ExcelExportXLSX from "@/components/ExcelExportXLSX.vue";
import PageTitle from "@/components/PageTitle.vue";

export default {
  name: "BudgetCalculator",

  components: {
    ExcelExportXLSX,
    PageTitle,
  },

  computed: {
    totals() {
      let total_cost = 0;
      let total_days = 0;
      let total_unit = 0;

      this.formData.details.forEach((detail) => {
        total_cost += detail.total_cost || 0;
        detail.members.forEach((member) => {
          total_days += member.days || 0;
          total_unit += member.unit || 0;
        });
      });

      this.formData.total_cost = total_cost;
      this.formData.total_days = total_days;
      this.formData.total_unit = total_unit;

      return {
        total_cost,
        total_days,
        total_unit,
      };
    },
  },

  watch: {
    "formData.template_id"(newTemplateId) {
      if (!newTemplateId) return;

      const selectedTemplate = this.templates[newTemplateId];

      if (!selectedTemplate) return;

      this.formData.details.forEach((detail) => {
        detail.members.forEach((member) => {
          const matched = selectedTemplate.details.find(
            (t) =>
              t.id === member.head_id &&
              t.department_id === detail.department_id
          );
          member.per_day_cost = matched ? matched.per_day_cost : 0;

          this.calculateTotal(detail, member);
        });
      });
    },
  },

  data() {
    return {
      storageKey: "budget_calculation_data",
      departments: [],
      heads: [],
      templates: [],

      formData: {
        template_id: "",
        title: "Mobile Game Development Budget Calculator",
        sub_title: "Estimate your mobile game development costs easily",
        remarks:
          "Along with the mobile game (Android, iOS) there will be an admin panel",

        details: [
          {
            department_id: "",
            total_cost: 0,
            members: [
              {
                head_id: "",
                unit: 0,
                days: 0,
                per_day_cost: 0,
                unit_cost: 0,
              },
            ],
          },
        ],
        total_days: 0,
        total_unit: 0,
        total_cost: 0,
        status: "Completed",
        created_at: new Date().toISOString(),
      },

      excel_fields: {
        SL: "SL",
        Department: "Department",
        Heads: "Heads",
        "No. of Unit": "NoOfUnit",
        "No. of Days": "NoOfDays",
        "Per Day Cost": "PerDayCost",
        "Unit Cost": "UnitCost",
        "Total Cost": "TotalCost",
      },
    };
  },

  methods: {
    submit() {
      if (!this.formData.title) {
        alert("⚠️ Please enter a project name or main title.");
        return;
      }

      const slug = this.generateSlug(this.formData.title);
      if (!slug) return;

      let storageData = JSON.parse(localStorage.getItem(this.storageKey)) || {};

      storageData[slug] = { ...this.formData, slug };

      localStorage.setItem(this.storageKey, JSON.stringify(storageData));
    },

    generateSlug(title) {
      if (!title) return null;
      return title
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
    },

    getHeads(department_id) {
      return this.heads.filter((d) => d.department_id === department_id);
    },

    selectHeads(id, detail, member) {
      this.templateInfo(detail, member);
      this.calculateTotal(detail, member);
    },

    calculateTotal(detail, member) {
      member.unit_cost =
        (member.unit || 0) * (member.days || 0) * (member.per_day_cost || 0);

      detail.total_cost = detail.members.reduce(
        (sum, m) => sum + (m.unit_cost || 0),
        0
      );
    },

    // Add / Remove Departments
    addDepartment() {
      this.formData.details.push(this.createDepartment());
    },
    removeDepartment(index) {
      this.formData.details.splice(index, 1);
    },

    // Add / Remove Members
    addMember(deptIndex) {
      this.formData.details[deptIndex].members.push(this.createMember());
    },
    removeMember(deptIndex, mIndex) {
      this.formData.details[deptIndex].members.splice(mIndex, 1);
    },

    // Factory functions for consistent structure
    createDepartment() {
      return {
        department_id: "",
        total_cost: 0,
        members: [this.createMember()],
      };
    },
    createMember() {
      return {
        head_id: "",
        unit: 0,
        days: 0,
        per_day_cost: 0,
        unit_cost: 0,
      };
    },

    isDepartmentSelected(deptId) {
      return this.formData.details.some((d) => d.department_id === deptId);
    },
    isHeadSelected(headId, members) {
      return members.some((d) => d.head_id === headId);
    },

    templateInfo(detail, item) {
      let findTemplate = this.templates[this.formData.template_id] || {};
      let selected = findTemplate?.details.find(
        (t) => t.id === item.head_id && detail.department_id === t.department_id
      );
      item.per_day_cost = selected ? selected.per_day_cost : 0;
    },

    loadData() {
      const deptStore = localStorage.getItem("department_data");
      const headsStore = localStorage.getItem("heads_data");
      const templatesStore = localStorage.getItem("template_data");
      if (deptStore) {
        try {
          this.departments = JSON.parse(deptStore);
        } catch (e) {
          console.error("Error parsing departments", e);
          this.departments = [...defaultDepartments];
        }
      } else {
        this.departments = [...defaultDepartments];
        localStorage.setItem(
          "department_data",
          JSON.stringify(this.departments)
        );
      }

      if (headsStore) {
        try {
          this.heads = JSON.parse(headsStore);
        } catch (e) {
          console.error("Error parsing heads", e);
          this.heads = [...defaultHeads];
        }
      } else {
        this.heads = [...defaultHeads];
        localStorage.setItem("heads_data", JSON.stringify(this.heads));
      }

      if (templatesStore) {
        try {
          this.templates = JSON.parse(templatesStore);
        } catch (e) {
          console.error("Error parsing templates", e);
          this.templates = [];
        }
      }
    },
  },

  mounted() {
    this.loadData();

    if (this.$route.query.slug) {
      const slug = this.$route.query.slug;
      const storageData =
        JSON.parse(localStorage.getItem(this.storageKey)) || {};
      if (storageData[slug]) {
        this.formData = { ...storageData[slug] };
      }
    }
  },
};
</script>

<style scoped>
select,
textarea,
input {
  outline: none;
}
</style>
