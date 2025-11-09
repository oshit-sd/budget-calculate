<template>
  <div class="min-h-screen bg-violet-50">
    <!-- Sidebar -->
    <Sidebar :sidebar-open="sidebarOpen" @close-sidebar="closeSidebar" />

    <!-- Main Content Area -->
    <div class="min-h-screen flex flex-col lg:pl-64">
      <!-- Header -->
      <Nav @toggle-sidebar="toggleSidebar" />

      <!-- Main Content -->
      <main class="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <PageTitle v-if="$route.name != 'dashboard'" />
          <router-view />
        </div>
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script>
import Nav from "@components/Nav.vue";
import Sidebar from "@components/Sidebar.vue";
import Footer from "@components/Footer.vue";
import PageTitle from "@components/PageTitle.vue";

export default {
  name: "App",
  components: {
    Nav,
    Sidebar,
    Footer,
    PageTitle,
  },
  data() {
    return {
      loading: false,
      sidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
  },
  mounted() {
    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (
        this.sidebarOpen &&
        !e.target.closest(".sidebar-container") &&
        !e.target.closest("[data-sidebar-toggle]")
      ) {
        this.closeSidebar();
      }
    });
  },
};
</script>
