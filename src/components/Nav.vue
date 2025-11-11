<template>
  <header
    class="sticky top-0 z-40 bg-white border-b border-gray-200 flex-shrink-0 h-16"
  >
    <div class="flex items-center justify-between px-6 py-4">
      <!-- Left Side - Mobile Menu Button -->
      <div class="flex items-center">
        <button
          @click="toggleSidebar"
          data-sidebar-toggle
          class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        >
          <Menu class="w-6 h-6" />
        </button>

        <!-- Page Title -->
        <div class="ml-4 lg:ml-0">
          <h1 class="text-lg font-semibold text-gray-900">
            {{ getCurrentPageTitle() }}
          </h1>
        </div>
      </div>

      <!-- Right Side -->
      <div class="flex items-center space-x-4">
        <!-- Notifications -->
        <button class="p-2 text-gray-400 hover:text-gray-600 relative">
          <Bell class="w-5 h-5" />
          <span
            class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          ></span>
        </button>

        <!-- User Profile -->
        <div class="hidden sm:flex items-center space-x-3">
          <img src="/images/user.png" alt="User" class="w-8 h-8 rounded-full" />
          <span class="text-sm font-medium text-gray-700">
            OSHIT SUTRADAR
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { Bell, Menu } from "lucide-vue-next";

export default {
  name: "Nav",
  components: {
    Bell,
    Menu,
  },
  emits: ["toggle-sidebar"],
  methods: {
    toggleSidebar() {
      this.$emit("toggle-sidebar");
    },
    getCurrentPageTitle() {
      const routeNameMap = {
        dashboard: "Dashboard",
        "budget-calculate": "Budget Calculate",
        heads: "Head",
        departments: "Departments",
        faq: "FAQ",
      };
      return routeNameMap[this.$route.name] || "Dashboard";
    },
  },
};
</script>
