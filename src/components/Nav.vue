<template>
  <nav class="bg-white border-b border-gray-200 px-6 py-1">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-16">
        <!-- Logo -->
        <router-link
          :to="{ name: 'dashboard' }"
          class="flex items-center space-x-2"
        >
          <div class="w-16 h-16 flex items-center justify-center">
            <img src="/images/logo.png" />
          </div>
          <span class="font-semibold text-gray-900 text-xl">Estimatica</span>
        </router-link>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            :to="{ name: 'dashboard' }"
            :class="linkClass('dashboard')"
          >
            Dashboard
          </router-link>

          <router-link
            :to="{ name: 'budget-calculate' }"
            :class="linkClass('budget-calculate')"
          >
            Budget Calculate
          </router-link>

          <router-link :to="{ name: 'heads' }" :class="linkClass('heads')">
            Head Template
          </router-link>

          <router-link
            :to="{ name: 'departments' }"
            :class="linkClass('departments')"
          >
            Departments
          </router-link>

          <router-link :to="{ name: 'faq' }" :class="linkClass('faq')">
            FAQ
          </router-link>
        </div>
      </div>

      <!-- Right Side -->
      <div class="flex items-center space-x-4">
        <button class="p-2 text-gray-400 hover:text-gray-600 relative">
          <a href="javascript:void(0)">
            <Bell class="w-5 h-5" />
          </a>
          <span
            class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          ></span>
        </button>
        <div class="flex items-center space-x-2">
          <img src="/images/user.png" alt="User" class="w-8 h-8 rounded-full" />
          <span class="text-sm font-medium text-gray-700">
            <a href="javascript:void(0)" target="_blank"> OSHIT SUTRADAR </a>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { Bell } from "lucide-vue-next";

export default {
  name: "Nav",
  components: {
    Bell,
  },
  data() {
    return {};
  },

  methods: {
    linkClass(name) {
      return [
        "pb-2 font-medium",
        this.$route.params.slug === name || this.$route.name === name
          ? "text-blue-800 border-b-2 border-blue-800"
          : "text-gray-500 hover:text-gray-700",
      ];
    },
  },
};
</script>
