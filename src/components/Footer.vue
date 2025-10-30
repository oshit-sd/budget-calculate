<template>
  <footer class="bg-white border-t border-gray-200 py-4 mt-auto">
    <div
      class="w-full mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm"
    >
      <p>
        &copy; {{ currentYear }} --
        <span
          class="text-red-400 font-bold hover:underline transition-all duration-300 underline"
          >Riseup Labs.</span
        >
        | All rights reserved.
      </p>
      <p class="text-md font-semibold">
        Developed by:
        <a
          href="https://riseuplabs.com/"
          target="_blank"
          class="text-red-400 font-bold hover:underline transition-all duration-300 underline"
        >
          Riseup Labs
        </a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>