<template>
  <div class="w-full flex justify-center">
    <div class="max-w-4xl w-full">
      <transition name="fade">
        <div
          v-if="message"
          class="mb-4 p-3 text-sm rounded bg-red-100 border border-red-300 text-red-700 flex justify-between items-center"
        >
          <div>{{ message }}</div>
          <button
            @click="$emit('dismiss')"
            class="ml-3 text-xs text-red-600 hover:underline cursor-pointer"
          >
            ✕
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
