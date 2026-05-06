<template>
  <div class="flex flex-col items-center">
    <div
      class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-3xl p-8 shadow-sm w-full max-w-md"
    >
      <!-- Header -->
      <div class="flex items-center justify-center gap-2 mb-8">
        <div class="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
        <h4
          class="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase"
        >
          EVENT TRIGGER
        </h4>
      </div>

      <!-- Buttons -->
      <div class="flex gap-4">
        <!-- Decrease -->
        <button
          @click="emitDecrease"
          class="flex-1 bg-gray-900 hover:bg-black text-white font-semibold py-6 rounded-3xl text-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
        >
          <span class="text-4xl leading-none -mt-1">−</span>
          <span>Decrease</span>
        </button>

        <!-- Increase -->
        <button
          @click="emitIncrement"
          class="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 rounded-3xl text-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
        >
          <span class="text-4xl leading-none -mt-1">+</span>
          <span>Increase</span>
        </button>
      </div>

      <!-- Hint -->
      <p class="text-center text-sm text-zinc-500 mt-8">
        Tap buttons to send events to parent
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventTrigger",
  methods: {
    emitIncrement() {
      this.$emit("increment");
    },
    emitDecrease() {
      this.$emit("decrement");
    },
  },
};
</script>
