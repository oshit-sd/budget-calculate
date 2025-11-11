<template>
  <div class="w-full mt-3">
    <!-- Left Side: Form -->
    <div class="bg-white shadow-lg rounded-lg p-6">
      <div
        class="flex justify-between items-center border-b border-gray-300 pb-2 mb-4"
      >
        <h2 class="text-xl font-semibold text-gray-800">Templates</h2>

        <router-link
          :to="{ name: 'templates.create' }"
          class="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
        >
          + Add Template
        </router-link>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-200 text-slate-800">
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">#</th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Template Name
              </th>
              <th class="px-4 py-2 text-left text-sm font-bold uppercase">
                Action
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
                {{ Object.keys(data).indexOf(index.toString()) + 1 }}
              </td>

              <td
                class="px-4 py-2 text-sm text-gray-700 border border-slate-200"
              >
                {{ item.template_name }}
              </td>
              <td
                class="px-4 py-2 text-sm text-gray-700 border border-slate-200"
              >
                <router-link
                  class="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                  :to="{ name: 'templates.create', query: { slug: index } }"
                  >Edit</router-link
                >
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
export default {
  name: "IndexTemplate",

  data() {
    return {
      data: [],
      departments: [],
      storageKey: "template_data",
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

    deleteItem(key) {
      if (confirm("Are you sure you want to delete this record?")) {
        delete this.data[key];
        this.saveData();
      }
    },

    saveData() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
