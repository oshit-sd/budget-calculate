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
              v-for="(project, index) in recentProjects"
              :key="index"
              class="hover:bg-violet-50 transition"
            >
              <td class="px-4 py-2 text-gray-700 font-medium">
                {{ project.name }}
              </td>
              <td class="px-4 py-2 text-gray-700">
                ${{ project.budget.toLocaleString() }}
              </td>
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
                <button class="text-violet-600 hover:underline">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BarChart, Users, FileText, DollarSign, Plus } from "lucide-vue-next";

const recentProjects = ref([
  {
    name: "Website Redesign",
    budget: 15000,
    status: "Completed",
    created_at: "2025-10-01",
  },
  {
    name: "Mobile App",
    budget: 35000,
    status: "In Progress",
    created_at: "2025-10-12",
  },
  {
    name: "Marketing Campaign",
    budget: 8000,
    status: "Pending",
    created_at: "2025-10-18",
  },
  {
    name: "CRM Integration",
    budget: 25000,
    status: "In Progress",
    created_at: "2025-10-22",
  },
]);

const stats = ref([
  { label: "Total Projects", value: 12, icon: BarChart },
  { label: "Total Budget", value: "$124,500", icon: DollarSign },
  { label: "Active Projects", value: 7, icon: FileText },
  { label: "Team Members", value: 18, icon: Users },
]);
</script>

<style scoped>
/* Smooth hover and scaling for cards */
</style>
