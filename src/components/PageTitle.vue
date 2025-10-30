<template>
  <div class="w-full mx-auto px-4 py-3 relative mb-3 md:mb-0">
    <nav
      class="absolute left-0 top-1 text-gray-500 text-sm flex gap-1 items-center"
    >
      <router-link
        :to="{ name: 'dashboard' }"
        class="hover:underline cursor-pointer text-gray-600"
      >
        Dashboard
      </router-link>
      <span>/</span>
      <span class="font-semibold text-blue-900">{{ $route.meta.title }}</span>
    </nav>

    <h1
      class="text-lg font-semibold tracking-tight text-center text-slate-700 hidden md:block"
    >
      {{ $route.meta.title }}
    </h1>
  </div>
</template>
