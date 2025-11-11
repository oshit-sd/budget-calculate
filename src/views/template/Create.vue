<template>
  <div class="w-full mt-3">
    <!-- Left Side: Form -->
    <div class="bg-white shadow-lg rounded-lg p-6">
      <div
        class="flex justify-between items-center border-b border-gray-300 pb-2 mb-4"
      >
        <h2 class="text-xl font-semibold text-gray-800">
          {{ editIndex !== null ? "Edit Template" : "Add Template" }}
        </h2>

        <router-link
          :to="{ name: 'templates' }"
          class="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
        >
          Back
        </router-link>
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <!-- Input Row -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-gray-700 text-sm font-medium mb-1">
              Template Name
            </label>
            <input
              v-model="formData.template_name"
              type="text"
              placeholder="Enter template name"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>
        </div>

        <!-- all heads -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-200 text-slate-800">
                <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                  #
                </th>
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
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr
                v-for="(item, index) in formData.details"
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
                  <input
                    type="number"
                    min="0"
                    v-model.number="item.per_day_cost"
                    @focus="(e) => e.target.select()"
                    class="text-center w-24 text-sm border border-gray-300 rounded-md"
                  />
                </td>
              </tr>

              <tr v-if="formData.details.length === 0">
                <td colspan="5" class="text-center text-gray-500 py-3 italic">
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Buttons Row -->
        <div class="flex justify-center gap-3">
          <button
            type="submit"
            class="bg-violet-500 hover:bg-violet-600 text-white cursor-pointer px-4 py-2 rounded-lg shadow-md transition-all"
          >
            {{ editIndex !== null ? "Update" : "Submit" }}
          </button>

          <button
            v-if="editIndex !== null"
            type="button"
            @click="cancelEdit"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 cursor-pointer px-4 py-2 rounded-lg shadow-md transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defaultDepartments, defaultHeads } from "@/data/defaults";

export default {
  name: "CreateTemplate",

  data() {
    return {
      formData: {
        template_name: "",
        details: [],
      },

      departments: [],
      defaultHeads: [],
      defaultDepartments: [],

      storageKey: "template_data",
      editIndex: null,
    };
  },

  methods: {
    submit() {
      if (!this.formData.template_name) {
        alert("⚠️ Please fill in all fields");
        return;
      }

      const slug = this.generateSlug(this.formData.template_name);
      if (!slug) return;

      let storageData = JSON.parse(localStorage.getItem(this.storageKey)) || {};

      storageData[slug] = { ...this.formData, slug };

      localStorage.setItem(this.storageKey, JSON.stringify(storageData));

      this.resetForm();
      this.$router.push({ name: "templates" });
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
      this.formData.template_name = "";
      this.getHeads();
    },

    getHeads() {
      const stored = localStorage.getItem("heads_data");
      if (stored) {
        try {
          this.formData.details = JSON.parse(stored);
        } catch (e) {
          console.error("Error parsing localStorage data", e);
        }
      }

      if (!this.formData.details || this.formData.details.length === 0) {
        this.formData.details = [...defaultHeads];

        localStorage.setItem("heads_data", JSON.stringify(this.data));
      }
    },

    getDepartments() {
      const stored = localStorage.getItem("department_data");
      if (stored) {
        try {
          this.departments = JSON.parse(stored);
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
    },
  },

  mounted() {
    this.getDepartments();

    if (this.$route.query.slug) {
      const slug = this.$route.query.slug;
      const storageData =
        JSON.parse(localStorage.getItem(this.storageKey)) || {};
      if (storageData[slug]) {
        this.formData = { ...storageData[slug] };
      }
    } else {
      this.getHeads();
    }
  },
};
</script>
