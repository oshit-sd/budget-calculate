<template>
  <div class="w-full grid grid-cols-1 md:grid-cols-12 gap-8 mt-3">
    <!-- Left Side: Form -->
    <div class="md:col-span-5 bg-white shadow-lg rounded-2xl p-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">
        {{ editIndex !== null ? "Edit Department" : "Add Department" }}
      </h2>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-1">Department Name</label>
          <input
            v-model="formData.department_name"
            type="text"
            placeholder="Enter department name"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:outline-none"
          />
        </div>

        <div class="flex gap-3">
          <button
            type="submit"
            class="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
          >
            {{ editIndex !== null ? "Update" : "Add" }}
          </button>

          <button
            v-if="editIndex !== null"
            type="button"
            @click="cancelEdit"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg shadow-md transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Right Side: Table -->
    <div class="md:col-span-7 bg-white shadow-lg rounded-2xl p-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Department List</h2>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-200 text-slate-800">
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">#</th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Department Name
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
                {{ item.department_name }}
              </td>
              <td
                class="px-4 py-2 text-sm text-gray-700 border border-slate-200"
              >
                <button
                  @click="editItem(index)"
                  class="text-blue-600 hover:text-blue-800 me-3 font-semibold cursor-pointer"
                >
                  Edit
                </button>
                <button
                  @click="deleteItem(index)"
                  class="text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>

            <tr v-if="data.length === 0">
              <td colspan="3" class="text-center text-gray-500 py-3 italic">
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
import { defaultDepartments } from "@/data/defaults";

export default {
  name: "Template",

  data() {
    return {
      formData: {
        department_name: "",
      },
      data: [],
      storageKey: "department_data",
      editIndex: null,
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
        this.data = [...defaultDepartments];
        this.saveData();
      }
    },

    saveData() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    },

    submit() {
      if (!this.formData.department_name) {
        alert("⚠️ Please fill in all fields");
        return;
      }

      if (this.editIndex !== null) {
        this.data[this.editIndex] = { ...this.formData };
        this.editIndex = null;
      } else {
        this.data.push({
          id: Date.now(),
          ...this.formData,
        });
      }

      this.saveData();
      this.resetForm();
    },

    editItem(index) {
      this.formData = { ...this.data[index] };
      this.editIndex = index;
    },

    deleteItem(index) {
      if (confirm("Are you sure you want to delete this record?")) {
        this.data.splice(index, 1);
        this.saveData();
      }
    },

    cancelEdit() {
      this.resetForm();
      this.editIndex = null;
    },

    resetForm() {
      this.formData = { department_name: "" };
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
