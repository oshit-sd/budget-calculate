<template>
  <div>
    <!-- Sidebar -->
    <div
      class="sidebar-container"
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <!-- Logo Section -->
      <div
        class="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0"
      >
        <router-link
          :to="{ name: 'dashboard' }"
          class="flex items-center space-x-3"
        >
          <div class="w-8 h-8 flex items-center justify-center">
            <img src="/images/logo.png" alt="Logo" class="w-full h-full" />
          </div>
          <span class="font-semibold text-gray-900 text-lg">Estimatica</span>
        </router-link>

        <!-- Close button for mobile -->
        <button
          @click="closeSidebar"
          class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <router-link
          :to="{ name: 'dashboard' }"
          :class="sidebarLinkClass('dashboard')"
          @click="closeSidebar"
        >
          <Home class="w-5 h-5" />
          <span>Dashboard</span>
        </router-link>

        <router-link
          :to="{ name: 'budget-calculate' }"
          :class="sidebarLinkClass('budget-calculate')"
          @click="closeSidebar"
        >
          <Calculator class="w-5 h-5" />
          <span>Budget Calculate</span>
        </router-link>

        <router-link
          :to="{ name: 'heads' }"
          :class="sidebarLinkClass('heads')"
          @click="closeSidebar"
        >
          <FileText class="w-5 h-5" />
          <span>Head Template</span>
        </router-link>

        <router-link
          :to="{ name: 'departments' }"
          :class="sidebarLinkClass('departments')"
          @click="closeSidebar"
        >
          <Building class="w-5 h-5" />
          <span>Departments</span>
        </router-link>

        <router-link
          :to="{ name: 'faq' }"
          :class="sidebarLinkClass('faq')"
          @click="closeSidebar"
        >
          <HelpCircle class="w-5 h-5" />
          <span>FAQ</span>
        </router-link>
      </nav>

      <!-- User Profile Section -->
      <div class="border-t border-gray-200 p-4 flex-shrink-0">
        <div class="flex items-center space-x-3">
          <img
            src="/images/user.png"
            alt="User"
            class="w-10 h-10 rounded-full"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              OSHIT SUTRADAR
            </p>
            <p class="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
    ></div>
  </div>
</template>

<script>
import {
  Home,
  Calculator,
  FileText,
  Building,
  HelpCircle,
  X,
} from "lucide-vue-next";

export default {
  name: "Sidebar",
  components: {
    Home,
    Calculator,
    FileText,
    Building,
    HelpCircle,
    X,
  },
  props: {
    sidebarOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close-sidebar"],
  methods: {
    sidebarLinkClass(name) {
      const isActive =
        this.$route.params.slug === name || this.$route.name === name;
      return [
        "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200",
        isActive
          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
      ];
    },
    closeSidebar() {
      this.$emit("close-sidebar");
    },
  },
};
</script>