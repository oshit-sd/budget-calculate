<template>
  <div class="w-full mt-3">
    <!-- Left Side: Form -->
    <div class="bg-white shadow-lg rounded-lg p-6">
      <div
        class="flex justify-between items-center border-b border-gray-300 pb-2 mb-4"
      >
        <h2 class="text-xl font-semibold text-gray-800">Budget Calculate</h2>

        <router-link
          :to="{ name: 'budgetCalculate.create' }"
          class="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
        >
          + New Budget Calculate
        </router-link>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-200 text-slate-800">
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">#</th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Project Name
              </th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Budget
              </th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Status
              </th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Created On
              </th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              v-for="(item, index) in data"
              :key="index"
              class="hover:bg-violet-50 transition"
            >
              <td class="px-4 py-2 text-gray-700 font-medium">
                {{ Object.keys(data).indexOf(index.toString()) + 1 }}
              </td>
              <td class="px-4 py-2 text-gray-700 font-medium">
                {{ item.title }}
              </td>
              <td class="px-4 py-2 text-gray-700">{{ item.total_cost }}</td>
              <td class="px-4 py-2">
                <span
                  :class="{
                    'bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold':
                      item.status === 'Completed',
                    'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold':
                      item.status === 'In Progress',
                    'bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold':
                      item.status === 'Pending',
                  }"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="px-4 py-2 text-gray-500">{{ item.created_at }}</td>
              <td class="px-4 py-2">
                <router-link
                  :to="{
                    name: 'budgetCalculate.create',
                    query: { slug: item.slug },
                  }"
                  class="text-violet-600 hover:underline"
                  >View</router-link
                >
              </td>
            </tr>

            <tr v-if="data.length === 0">
              <td colspan="5" class="text-center text-gray-500 py-3 italic">
                No data available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexBudgetCalculate",

  data() {
    return {
      data: [],
      departments: [],
      storageKey: "budget_calculation_data",
    };
  },

  methods: {
    getData() {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        try {
          this.data = JSON.parse(stored);
        } catch (e) {
          console.error("Error parsing localStorage data", e);
        }
      }
    },

    deleteItem(index) {
      if (confirm("Are you sure you want to delete this record?")) {
        this.data.splice(index, 1);
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      }
    },

    loadDepartments() {
      const stored = localStorage.getItem("department_data");
      if (stored) {
        try {
          this.departments = JSON.parse(stored);
        } catch (e) {
          console.error("Error parsing departments", e);
          this.departments = [...defaultDepartments];
        }
      }
    },
  },

  mounted() {
    this.loadDepartments();
    this.getData();
  },
};
</script>
