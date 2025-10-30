<template>
  <div class="min-h-screen w-full flex flex-col bg-violet-50">
    <Nav />

    <main class="flex-1 px-4 py-2 md:py-3 sm:px-6">
      <PageTitle v-if="$route.name != 'dashboard'" />
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Nav from "@components/Nav.vue";
import Footer from "@components/Footer.vue";
import PageTitle from "@components/PageTitle.vue";

export default {
  name: "App",
  components: { Nav, Footer, PageTitle },
  data() {
    return {
      loading: false,
    };
  },
};
</script>
