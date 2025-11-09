<template>
  <div class="mb-3" v-if="$route.meta?.title || title">
    <!-- Breadcrumb Navigation with Actions -->
    <div class="flex items-center justify-between">
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
        <span class="font-medium text-gray-900">{{
          $route.meta?.title || title
        }}</span>
      </nav>

      <!-- Action slot for buttons -->
      <div class="flex items-center space-x-2">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
