<template>
  <div class="w-full mt-3">
    <!-- Left Side: Form -->
    <div class="bg-white shadow-lg rounded-lg p-6">
      <div
        class="flex justify-between items-center border-b border-gray-300 pb-2 mb-4"
      >
        <h2 class="text-xl font-semibold text-gray-800">Heads</h2>

        <router-link
          :to="{ name: 'heads.create' }"
          class="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
        >
          + Add Head
        </router-link>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-200 text-slate-800">
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">#</th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Department Name
              </th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Head Name
              </th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Type
              </th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Per Day Cost
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
              <td
                class="px-4 py-2 text-sm text-gray-700 border border-slate-200"
              >
                {{ index + 1 }}
              </td>
              <td
                class="px-4 py-2 text-sm text-gray-700 border border-slate-200"
              >
                {{
                  departments.find((dept) => dept.id === item.department_id)
                    ?.department_name || ""
                }}
              </td>
              <td
                class="px-4 py-2 text-sm text-gray-700 border border-slate-200"
              >
                {{ item.head_name }}
              </td>
              <td
                class="px-4 py-2 text-sm text-gray-700 border border-slate-200"
              >
                {{ item.type }}
              </td>
              <td
                class="px-4 py-2 text-sm text-gray-700 border border-slate-200"
              >
                {{ item.per_day_cost }}
              </td>
              <td
                class="px-4 py-2 text-sm text-gray-700 border border-slate-200"
              >
                <router-link
                  class="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                  :to="{ name: 'heads.create', query: { id: item.id } }"
                >
                  Edit
                </router-link>
                <button
                  @click="deleteItem(index)"
                  class="text-red-600 hover:text-red-800 ms-4 font-semibold cursor-pointer"
                >
                  Delete
                </button>
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
import { defaultDepartments, defaultHeads } from "@/data/defaults";

export default {
  name: "IndexHeads",

  data() {
    return {
      data: [],
      departments: [],
      storageKey: "heads_data",
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

      // If empty, preload default departments
      if (!this.data || this.data.length === 0) {
        this.data = [...defaultHeads];
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
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
