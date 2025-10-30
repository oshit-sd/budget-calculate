<template>
  <div
    class="flex flex-col items-center justify-center w-full h-full bg-violet-50 px-4 py-10"
  >
    <h1
      class="text-8xl md:text-9xl font-extrabold truncate bg-gradient-to-r from-red-700 via-pink-600 to-red-600 bg-clip-text text-transparent"
    >
      ৪০৪
    </h1>

    <p
      class="mt-4 text-2xl md:text-3xl font-semibold text-gray-700 text-center"
    >
      পেজ পাওয়া যায়নি
    </p>
    <p class="mt-2 text-gray-500 text-center max-w-md">
      দুঃখিত, আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি। আপনি হোমপেজে ফিরে যেতে
      পারেন।
    </p>
    <router-link
      :to="{ name: 'dashboard' }"
      class="mt-6 inline-block px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-800 to-sky-600 hover:blue-900 hover:to-sky-900 transition-all duration-300"
    >
      হোমে ফিরে যান
    </router-link>
  </div>
</template>

<script setup>
// No special script needed
</script>
