<template>
  <div>
    <PageTitle title="Budget Calculate">
      <template #actions>
        <ExcelExport
          :details="formData.details"
          :departments="departments"
          :fields="excel_fields"
          :header="[mainTitle, subTitle]"
          :deliverables="deliverables"
          :totals="totals"
          file-name="budget-calculation.xlsx"
        >
          ⬇ Download Budget Excel
        </ExcelExport>
      </template>
    </PageTitle>

    <!-- <ExcelExportXLSX
      :details="formData.details"
      :departments="departments"
      file-name="mobile_game_budget.xlsx"
    >
      ⬇ Download Budget Excel
    </ExcelExportXLSX> -->

    <!-- Table Container -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Header -->
      <div class="rounded-lg p-6">
        <!-- Main Title -->
        <div class="text-center">
          <input
            v-model="mainTitle"
            type="text"
            class="text-xl font-bold text-slate-900 w-full text-center bg-transparent focus:ring-2 focus:ring-violet-500 rounded-md"
          />
        </div>

        <!-- Subtitle -->
        <div class="text-center">
          <input
            v-model="subTitle"
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
                    @change="selectHeads($event.target.value, member)"
                    v-model="member.user_id"
                    class="w-full bg-transparent text-slate-900 font-medium focus:ring-2 focus:ring-violet-500 rounded-md"
                  >
                    <option value="">--Select Head--</option>
                    <option
                      v-for="des in getHeads(detail.department_id)"
                      :key="des.head"
                      :value="des.id"
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
                    class="text-center w-20 bg-transparent focus:ring-2 focus:ring-violet-500 rounded-md"
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
                    class="text-center w-20 bg-transparent focus:ring-2 focus:ring-violet-500 rounded-md"
                  />
                </td>

                <!-- Per Day Cost -->
                <!-- <td class="px-2 py-1 text-center border border-slate-200">
                  <input
                    type="number"
                    min="0"
                    v-model.number="member.per_day_cost"
                    @input="calculateTotal(detail, member)"
                    @focus="(e) => e.target.select()"
                    class="text-center w-24 bg-transparent focus:ring-2 focus:ring-violet-500 rounded-md"
                  />
                </td> -->

                <td
                  class="px-4 py-1 text-sm text-center text-slate-800 border border-slate-200"
                >
                  {{ member.per_day_cost || "-" }}
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
                    class="text-red-500 hover:text-red-700 font-semibold text-xl cursor-pointer"
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
                    class="text-red-500 hover:text-red-700 me-3 font-semibold text-xl cursor-pointer"
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
                Total Cost
              </td>
              <td colspan="5" class="px-4 border border-slate-200"></td>
              <td
                class="px-4 py-1 text-sm font-medium text-slate-900 text-center align-middle border border-slate-200"
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

      <!-- Deliverables -->
      <div class="p-6">
        <div class="flex items-start space-x-4">
          <span class="font-semibold text-slate-900 w-20 mt-1"
            >Deliverables:</span
          >
          <textarea
            v-model="deliverables"
            class="flex-1 bg-transparent focus:ring-2 focus:ring-violet-500 rounded-md resize-none p-1 text-slate-700"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defaultDepartments, defaultHeads } from "@/data/defaults";

import ExcelExport from "@/components/ExcelExport.vue";
import ExcelExportXLSX from "@/components/ExcelExportXLSX.vue";
import PageTitle from "@/components/PageTitle.vue";

export default {
  name: "BudgetCalculator",

  components: {
    ExcelExport,
    ExcelExportXLSX,
    PageTitle,
  },

  computed: {
    totals() {
      let total_cost = 0;

      this.formData.details.forEach((detail) => {
        total_cost += detail.total_cost || 0;
      });

      return {
        total_cost,
      };
    },
  },

  data() {
    return {
      mainTitle: "Mobile Game Development Budget Calculator",
      subTitle: "Estimate your mobile game development costs easily",
      deliverables:
        "Along with the mobile game (Android, iOS) there will be an admin panel",

      departments: [],
      heads: [],

      formData: {
        project_id: null,
        details: [
          {
            department_id: "",
            total_cost: 0,
            members: [
              {
                user_id: "",
                unit: 0,
                days: 0,
                per_day_cost: 0,
                unit_cost: 0,
              },
            ],
          },
        ],
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
    getHeads(department_id) {
      return this.heads.filter((d) => d.department_id === department_id);
    },

    selectHeads(id, member) {
      const head = this.heads.find((d) => parseInt(d.id) === parseInt(id));
      if (head) {
        member.per_day_cost = head.per_day_salary;
      }
    },

    calculateTotal(dept, member) {
      member.unit_cost =
        (member.unit || 0) * (member.days || 0) * (member.per_day_cost || 0);

      dept.total_cost = dept.members.reduce(
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
        user_id: "",
        unit: 0,
        days: 0,
        per_day_cost: 0,
        unit_cost: 0,
      };
    },

    loadData() {
      const deptStore = localStorage.getItem("department_data");
      const headsStore = localStorage.getItem("heads_data");
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
    },
  },

  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
select,
input {
  border: none;
  outline: none;
}
</style>
