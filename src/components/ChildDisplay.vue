<template>
  <div
    class="mt-6 p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 transition-all duration-200"
  >
    <div class="flex items-center gap-2 mb-4">
      <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
      <h4
        class="text-xs font-semibold tracking-[0.5px] text-zinc-500 dark:text-zinc-400 uppercase"
      >
        Child Component
      </h4>
    </div>

    <p class="text-[17px] leading-relaxed text-zinc-700 dark:text-zinc-200">
      "{{ message }}"
    </p>
  </div>
</template>

<script>
export default {
  name: "ChildDisplay",
  props: {
    message: {
      type: String,
      default: "No message received yet",
    },
  },
};
</script>
