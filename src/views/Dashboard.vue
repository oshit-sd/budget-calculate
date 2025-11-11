<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-800">Welcome to Estimatica</h1>

      <router-link
        :to="{ name: 'budget-calculate' }"
        class="b bg-violet-800 text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition transform flex items-center gap-2"
      >
        <Plus class="w-5 h-5" />
        <span>New Budget Calculate</span>
      </router-link>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="relative bg-white rounded-xl shadow-lg p-5 overflow-hidden hover:shadow-2xl transition cursor-pointer"
      >
        <div
          class="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-purple-200 to-violet-300 rounded-full opacity-50"
        ></div>
        <div class="flex items-center space-x-4">
          <div class="text-3xl text-violet-600">
            <component :is="stat.icon" />
          </div>
          <div>
            <p class="text-gray-500 text-sm">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-800">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Projects Table -->
    <div class="bg-white shadow-lg rounded-xl p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-5">
        Recent Project Estimates
      </h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-violet-50">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Project Name
              </th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Budget
              </th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Created On
              </th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(project, index) in projects"
              :key="index"
              class="hover:bg-violet-50 transition"
            >
              <td class="px-4 py-2 text-gray-700 font-medium">
                {{ project.title }}
              </td>
              <td class="px-4 py-2 text-gray-700">{{ project.total_cost }}</td>
              <td class="px-4 py-2">
                <span
                  :class="{
                    'bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold':
                      project.status === 'Completed',
                    'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold':
                      project.status === 'In Progress',
                    'bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold':
                      project.status === 'Pending',
                  }"
                >
                  {{ project.status }}
                </span>
              </td>
              <td class="px-4 py-2 text-gray-500">{{ project.created_at }}</td>
              <td class="px-4 py-2">
                <router-link
                  :to="{
                    name: 'budget-calculate',
                    query: { slug: project.slug },
                  }"
                  class="text-violet-600 hover:underline"
                  >View</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { BarChart, Users, FileText, Banknote, Plus } from "lucide-vue-next";

export default {
  name: "Dashboard",

  components: {
    BarChart,
    Users,
    FileText,
    Banknote,
    Plus,
  },

  data() {
    return {
      projects: [],
      stats: [
        { label: "Total Projects", value: 0, icon: BarChart },
        { label: "Total Budget", value: "$0.00", icon: Banknote },
        { label: "Active Projects", value: 0, icon: FileText },
        { label: "Team Members", value: 0, icon: Users },
      ],
    };
  },

  mounted() {
    this.loadDashboardData();
  },

  methods: {
    loadDashboardData() {
      try {
        const departmentsStored = localStorage.getItem("department_data");
        const deptParsed = JSON.parse(departmentsStored);

        const headsStored = localStorage.getItem("heads_data");
        const headParsed = JSON.parse(headsStored);

        const budgetStored = localStorage.getItem("budget_calculation_data");
        const budgetParsed = JSON.parse(budgetStored);

        let totalBudget = 0;
        let totalProjects = 0;

        if (budgetParsed) {
          this.projects = Object.values(budgetParsed);
          totalProjects = Object.keys(this.projects).length;
          totalBudget = this.projects.reduce(
            (sum, project) => sum + (parseFloat(project.total_cost) || 0),
            0
          );
        }

        this.stats = [
          { label: "Total Projects", value: totalProjects, icon: BarChart },
          {
            label: "Total Budget",
            value: totalBudget.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            }),
            icon: Banknote,
          },
          {
            label: "Total Departments",
            value: deptParsed ? Object.keys(deptParsed).length : 0,
            icon: FileText,
          },
          {
            label: "Total Heads",
            value: headParsed ? Object.keys(headParsed).length : 0,
            icon: FileText,
          },
        ];
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        this.projects = [];
      }
    },
  },
};
</script>
