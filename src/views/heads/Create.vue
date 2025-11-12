<template>
  <div class="w-full mt-6 flex justify-center">
    <!-- Main Card -->
    <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
      <!-- Header -->
      <div
        class="flex justify-between items-center border-b border-gray-200 pb-3 mb-6"
      >
        <h2 class="text-2xl font-semibold text-gray-800">
          {{ editIndex !== null ? "Edit Head" : "Add Head" }}
        </h2>

        <router-link
          :to="{ name: 'heads' }"
          class="bg-violet-500 hover:bg-violet-600 text-white px-5 py-2 rounded-lg shadow-md transition-all"
        >
          Back
        </router-link>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit" class="space-y-5">
        <!-- Department -->
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">
            Department
          </label>
          <select
            v-model="formData.department_id"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
          >
            <option value="" disabled>-- Select a department --</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">
              {{ dept.department_name }}
            </option>
          </select>
        </div>

        <!-- Type -->
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1"
            >Type</label
          >
          <input
            v-model="formData.type"
            type="text"
            placeholder="Enter type"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
          />
        </div>

        <!-- Head Name -->
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">
            Head Name
          </label>
          <input
            v-model="formData.head_name"
            type="text"
            placeholder="Enter head name"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
          />
        </div>

        <!-- Per Day Cost -->
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">
            Per Day Cost
          </label>
          <input
            v-model="formData.per_day_cost"
            type="number"
            placeholder="Enter per day cost"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none"
          />
        </div>

        <!-- Buttons -->
        <div class="flex justify-center gap-4 pt-3">
          <button
            type="submit"
            class="bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"
          >
            {{ editIndex !== null ? "Update" : "Submit" }}
          </button>

          <button
            v-if="editIndex !== null"
            type="button"
            @click="cancelEdit"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg shadow-md transition-all"
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
        department_id: "",
        head_name: "",
      },

      data: [],
      departments: [],
      defaultHeads: [],
      defaultDepartments: [],

      storageKey: "heads_data",
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
        this.data = [...defaultHeads];
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      }
    },

    submit() {
      if (!this.formData.head_name) {
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

      localStorage.setItem(this.storageKey, JSON.stringify(this.data));

      this.resetForm();
      this.$router.push({ name: "heads" });
    },

    resetForm() {
      this.formData.department_id = "";
      this.formData.template_name = "";
      this.getData();
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
    this.getData();

    if (this.$route.query.id) {
      const id = this.$route.query.id;

      const existingItemIndex = this.data.findIndex(
        (item) => Number(item.id) === Number(id)
      );

      if (existingItemIndex !== -1) {
        this.formData = { ...this.data[existingItemIndex] };
        this.editIndex = existingItemIndex;
      } else {
        console.warn(`No item found with ID: ${id}`);
      }
    }
  },
};
</script>
