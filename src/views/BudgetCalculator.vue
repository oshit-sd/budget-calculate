<template>
  <div>
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm p-8 mb-6">
      <h1 class="text-3xl font-bold text-center text-slate-900 mb-2">
        Cost Breakdown for Item A
      </h1>
      <p class="text-center text-lg text-slate-600 font-medium">
        Development of Bird Watch Game
      </p>
    </div>

    <!-- Table Container -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-slate-800 text-white">
              <th class="px-4 py-3 text-left text-sm font-semibold">Sl.</th>
              <th class="px-4 py-3 text-left text-sm font-semibold">
                Departments
              </th>
              <th class="px-4 py-3 text-left text-sm font-semibold">Heads</th>
              <th class="px-4 py-3 text-center text-sm font-semibold">
                No. of Unit
              </th>
              <th class="px-4 py-3 text-center text-sm font-semibold">
                No. of Days
              </th>
              <th class="px-4 py-3 text-center text-sm font-semibold">
                Per Day Cost
              </th>
              <th class="px-4 py-3 text-center text-sm font-semibold">
                Unit Cost
              </th>
              <th class="px-4 py-3 text-center text-sm font-semibold">
                Total Cost
              </th>
              <th class="px-4 py-3 text-center text-sm font-semibold"></th>
              <th class="px-4 py-3 text-center text-sm font-semibold"></th>
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
                  class="px-4 py-3 text-sm font-medium text-slate-900 text-center align-middle border border-slate-200"
                >
                  {{ deptIndex + 1 }}
                </td>

                <!-- Department Dropdown -->
                <td
                  v-if="mIndex === 0"
                  :rowspan="detail.members.length"
                  class="px-4 py-3 text-sm text-slate-700 align-middle border border-slate-200"
                >
                  <select
                    v-model="detail.department_id"
                    class="w-full bg-transparent text-slate-900 font-medium focus:ring-2 focus:ring-violet-500 rounded-md"
                  >
                    <option value="">Select Department</option>
                    <option
                      v-for="dept in departments"
                      :key="dept.id"
                      :value="dept.id"
                    >
                      {{ dept.name }}
                    </option>
                  </select>
                </td>

                <!-- Member Dropdown -->
                <td
                  class="px-4 py-3 text-sm text-slate-700 border border-slate-200"
                >
                  <select
                    v-model="member.user_id"
                    class="w-full bg-transparent text-slate-900 font-medium focus:ring-2 focus:ring-violet-500 rounded-md"
                  >
                    <option value="">Select Member</option>
                    <option
                      v-for="des in getDesignations(detail.department_id)"
                      :key="des.head"
                      :value="des.head"
                    >
                      {{ des.head }}
                    </option>
                  </select>
                </td>

                <!-- Units -->
                <td class="px-2 py-3 text-center border border-slate-200">
                  <input
                    type="number"
                    v-model.number="member.unit"
                    @input="calculateTotal(detail, member)"
                    @focus="(e) => e.target.select()"
                    class="text-center w-20 bg-transparent focus:ring-2 focus:ring-violet-500 rounded-md"
                  />
                </td>

                <!-- Days -->
                <td class="px-2 py-3 text-center border border-slate-200">
                  <input
                    type="number"
                    v-model.number="member.days"
                    @input="calculateTotal(detail, member)"
                    @focus="(e) => e.target.select()"
                    class="text-center w-20 bg-transparent focus:ring-2 focus:ring-violet-500 rounded-md"
                  />
                </td>

                <!-- Per Day Cost -->
                <td class="px-2 py-3 text-center border border-slate-200">
                  <input
                    type="number"
                    v-model.number="member.per_day_cost"
                    @input="calculateTotal(detail, member)"
                    @focus="(e) => e.target.select()"
                    class="text-center w-24 bg-transparent focus:ring-2 focus:ring-violet-500 rounded-md"
                  />
                </td>

                <!-- Unit Cost -->
                <td
                  class="px-4 py-3 text-sm text-center text-slate-800 border border-slate-200"
                >
                  {{ member.unit_cost || "-" }}
                </td>

                <!-- Total Cost -->
                <td
                  v-if="mIndex === 0"
                  :rowspan="detail.members.length"
                  class="px-4 py-3 text-sm text-center text-slate-800 border border-slate-200"
                >
                  {{ detail.total_cost || "-" }}
                </td>

                <!-- Actions -->
                <td
                  class="px-4 py-3 text-center border border-slate-200 text-sm"
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

                <!-- Actions -->
                <td
                  v-if="mIndex === 0"
                  :rowspan="detail.members.length"
                  class="px-4 py-3 text-center text-sm border border-slate-200"
                >
                  <button
                    v-if="formData.details.length > 1"
                    class="text-red-500 hover:text-red-700 me-3 font-semibold text-xl cursor-pointer"
                    @click="this.formData.details.splice(deptIndex, 1)"
                  >
                    ×
                  </button>
                  <button
                    v-if="formData.details.length == deptIndex + 1"
                    class="text-violet-600 hover:text-violet-800 font-semibold text-xl cursor-pointer"
                    @click="addDepartment()"
                  >
                    +
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Deliverables -->
    <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
      <p class="text-sm text-slate-700">
        <span class="font-semibold text-slate-900">Deliverables:</span>
        <span class="ml-2">{{ deliverables }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BudgetCalculator",
  data() {
    return {
      deliverables:
        "Along with the mobile game (Android, iOS) there will be an admin panel",

      departments: [
        { id: 1, name: "Managing & Planning Department" },
        { id: 2, name: "Art Department" },
        { id: 3, name: "Development Department" },
      ],

      designations: [
        { head: "Project Manager", department_id: 1 },
        { head: "Game Designer", department_id: 1 },
        { head: "UI/UX Designer", department_id: 2 },
        { head: "2D Game Artist", department_id: 2 },
        { head: "Spine Animator", department_id: 2 },
        { head: "Unity Developer", department_id: 3 },
        { head: "Backend Developer", department_id: 3 },
      ],

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
    };
  },
  methods: {
    getDesignations(department_id) {
      return this.designations.filter((d) => d.department_id === department_id);
    },
    calculateTotal(dept, member) {
      member.unit_cost =
        (member.unit || 0) * (member.days || 0) * (member.per_day_cost || 0);

      dept.total_cost = dept.members.reduce(
        (sum, m) => sum + (m.unit_cost || 0),
        0
      );
    },

    addDepartment() {
      this.formData.details.push({
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
      });
    },
    addMember(deptIndex) {
      this.formData.details[deptIndex].members.push({
        user_id: "",
        unit: 0,
        days: 0,
        per_day_cost: 0,
        unit_cost: 0,
      });
    },
    removeMember(deptIndex, mIndex) {
      this.formData.details[deptIndex].members.splice(mIndex, 1);
    },
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
