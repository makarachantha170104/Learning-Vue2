<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Custom Events in Vue 2
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn how a child component communicates with its parent using
          <span class="font-semibold text-purple-600">$emit()</span>
        </p>
      </div>

      <!-- Live Demo -->
      <div class="bg-white rounded-3xl shadow-sm p-8 md:p-12 mb-12">
        <h2 class="text-2xl font-semibold text-center mb-8">Live Demo</h2>

        <div
          class="bg-gray-50 border border-gray-200 rounded-3xl p-12 text-center"
        >
          <p
            class="text-7xl font-bold text-gray-800 mb-10 font-mono tracking-tighter"
          >
            {{ count }}
          </p>

          <EventTrigger
            @increment="handleIncrement"
            @decrement="handleDecrement"
          />
        </div>
      </div>

      <!-- How It Works -->
      <div class="bg-white rounded-3xl p-8 md:p-10 shadow-sm mb-12">
        <h2 class="text-2xl font-semibold mb-8 text-center">
          How Custom Events Work
        </h2>

        <div class="grid md:grid-cols-2 gap-10">
          <div class="text-center md:text-left">
            <h3 class="font-semibold text-purple-700 mb-4">Child Component</h3>
            <div
              class="bg-gray-900 text-gray-100 p-6 rounded-2xl font-mono text-sm"
            >
              this.$emit('increment')<br />
              this.$emit('decrement')
            </div>
            <p class="mt-4 text-gray-600">Child sends signal to parent</p>
          </div>

          <div class="text-center md:text-left">
            <h3 class="font-semibold text-blue-700 mb-4">Parent Component</h3>
            <div
              class="bg-gray-900 text-gray-100 p-6 rounded-2xl font-mono text-sm"
            >
              &lt;EventTrigger <br />
                @increment="handleIncrement" <br />
                @decrement="handleDecrement" <br />
              /&gt;
            </div>
            <p class="mt-4 text-gray-600">Parent listens and reacts</p>
          </div>
        </div>
      </div>

      <!-- Key Takeaways -->
      <div
        class="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 md:p-10"
      >
        <h3 class="font-semibold text-xl mb-6 text-emerald-800">
          Important Points
        </h3>
        <ul class="space-y-4 text-emerald-700">
          <li class="flex items-start gap-3">
            <span class="text-2xl">↑</span>
            <span
              ><strong>Events flow upwards</strong> — from Child to Parent</span
            >
          </li>
          <li class="flex items-start gap-3">
            <span class="text-2xl">🔄</span>
            <span
              >Props go down, Events go up — This is the standard pattern in
              Vue</span
            >
          </li>
          <li class="flex items-start gap-3">
            <span class="text-2xl">📦</span>
            <span
              >You can also pass data:
              <code>this.$emit('increment', 5)</code></span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import EventTrigger from "@/components/EventTrigger.vue";

export default {
  name: "EventsPage",
  components: { EventTrigger },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    handleIncrement() {
      this.count++;
    },
    handleDecrement() {
      this.count--;
    },
  },
};
</script>
