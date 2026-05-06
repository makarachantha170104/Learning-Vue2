<template>
  <button
    class="px-8 py-3.5 rounded-3xl font-semibold text-base tracking-[-0.01em] transition-all duration-200 active:scale-[0.97] focus:outline-none flex items-center justify-center gap-2"
    :class="variantClasses"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "default", // "small", "default", "large"
    },
  },
  computed: {
    variantClasses() {
      const base = "shadow-sm active:shadow-none";

      if (this.variant === "primary") {
        return `${base} bg-black text-white hover:bg-zinc-900 active:bg-zinc-950`;
      } else if (this.variant === "secondary") {
        return `${base} bg-zinc-100 text-black hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700`;
      } else if (this.variant === "outline") {
        return `border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900`;
      }

      // Default fallback
      return `${base} bg-black text-white hover:bg-zinc-900`;
    },
  },
};
</script>
