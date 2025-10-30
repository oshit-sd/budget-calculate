<template>
  <div
    class="flex flex-col items-center justify-center w-full h-full bg-violet-50 px-4 py-10"
  >
    <h1
      class="text-8xl md:text-9xl font-extrabold truncate bg-gradient-to-r from-red-700 via-pink-600 to-red-600 bg-clip-text text-transparent"
    >
      404
    </h1>

    <p
      class="mt-4 text-2xl md:text-3xl font-semibold text-gray-700 text-center"
    >
      Page Not Found
    </p>
    <p class="mt-2 text-gray-500 text-center max-w-md">
      Sorry, the page you are looking for could not be found. You can return to
      the homepage.
    </p>
    <router-link
      :to="{ name: 'dashboard' }"
      class="mt-6 inline-block px-6 py-3 rounded-lg text-white font-semibold bg-blue-800 hover:blue-900 hover:bg-blue-900 transition-all duration-300"
    >
      Go Back Home
    </router-link>
  </div>
</template>