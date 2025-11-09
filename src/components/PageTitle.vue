<template>
  <div class="mb-6">
    <!-- Breadcrumb Navigation -->
    <nav class="flex items-center space-x-2 text-sm text-gray-500">
      <router-link
        :to="{ name: 'dashboard' }"
        class="hover:text-gray-700 transition-colors duration-200"
      >
        Dashboard
      </router-link>
      <svg
        class="w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
      <span class="font-medium text-gray-900">{{ getCurrentPageTitle() }}</span>
    </nav>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  methods: {
    getCurrentPageTitle() {
      const routeNameMap = {
        dashboard: "Dashboard",
        "budget-calculate": "Budget Calculate",
        heads: "Head Template",
        departments: "Departments",
        faq: "FAQ",
        reports: "Reports",
      };
      return (
        this.$route.meta?.title || routeNameMap[this.$route.name] || "Dashboard"
      );
    },
  },
};
</script>
