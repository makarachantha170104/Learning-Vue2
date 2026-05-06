<template>
  <router-link
    :to="to"
    class="group flex items-center gap-3 px-6 py-[18px] text-[17px] font-medium rounded-3xl transition-all duration-200 active:scale-[0.98]"
    :class="linkClasses"
    @click="$emit('click')"
  >
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    to: { type: [String, Object], required: true },
  },
  computed: {
    linkClasses() {
      return (
        "text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:active:bg-zinc-700 " +
        "router-link-active:bg-violet-50 router-link-active:text-violet-600 dark:router-link-active:bg-zinc-800 dark:router-link-active:text-violet-400"
      );
    },
  },
};
</script>
