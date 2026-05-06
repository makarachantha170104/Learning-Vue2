<template>
  <router-link
    :to="to"
    exact-active-class="active"
    class="flex-1 flex flex-col items-center gap-1 py-2 text-[13px] font-medium transition-all active:scale-95"
    :class="linkClasses"
  >
    <slot name="icon" />
    <span><slot /></span>

    <!-- Active pill indicator -->
    <div
      class="h-1 w-5 bg-black dark:bg-white rounded-full scale-0 transition-transform duration-300 active:scale-100"
    />
  </router-link>
</template>

<script>
export default {
  props: {
    to: { type: [String, Object], required: true },
  },
  computed: {
    linkClasses() {
      return [
        "text-zinc-500 dark:text-zinc-400",
        "[&.active]:text-black dark:[&.active]:text-white",
        "[&.active] span:font-semibold",
      ];
    },
  },
};
</script>
