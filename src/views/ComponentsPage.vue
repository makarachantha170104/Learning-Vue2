<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Reusable Components
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn how to build clean, reusable, and maintainable components in Vue
          2
        </p>
      </div>

      <!-- Introduction Card -->
      <div
        class="bg-white rounded-3xl shadow-sm p-8 mb-12 border border-gray-100"
      >
        <h2 class="text-2xl font-semibold mb-4 text-gray-900">
          Why Reusable Components?
        </h2>
        <div class="grid md:grid-cols-3 gap-6 text-gray-600">
          <div class="flex gap-3">
            <span class="text-green-500 text-xl">♻️</span>
            <div>
              <p class="font-medium text-gray-800">DRY Principle</p>
              <p class="text-sm">Write once, use everywhere</p>
            </div>
          </div>
          <div class="flex gap-3">
            <span class="text-green-500 text-xl">🔧</span>
            <div>
              <p class="font-medium text-gray-800">Maintainability</p>
              <p class="text-sm">Easier to update and debug</p>
            </div>
          </div>
          <div class="flex gap-3">
            <span class="text-green-500 text-xl">📦</span>
            <div>
              <p class="font-medium text-gray-800">Consistency</p>
              <p class="text-sm">Unified design across the app</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Button Component Example -->
      <div class="bg-white rounded-3xl shadow-sm p-8 mb-10">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-semibold text-gray-900">Button Component</h3>
          <span
            class="px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-700 rounded-full"
            >BaseButton.vue</span
          >
        </div>

        <div
          class="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-wrap gap-4 items-center justify-center"
        >
          <BaseButton variant="primary">Primary Button</BaseButton>
          <BaseButton variant="secondary">Secondary Button</BaseButton>
          <BaseButton variant="outline">Outline Button</BaseButton>
          <BaseButton variant="danger" size="sm">Delete</BaseButton>
        </div>

        <div class="mt-8">
          <h4 class="font-medium text-gray-700 mb-3">Features:</h4>
          <ul
            class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600"
          >
            <li class="flex items-start gap-2">
              <span class="text-blue-500 mt-1">→</span>
              Multiple variants (primary, secondary, outline, danger)
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500 mt-1">→</span>
              Different sizes (small, medium, large)
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500 mt-1">→</span>
              Loading state support
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500 mt-1">→</span>
              Fully accessible &amp; keyboard friendly
            </li>
          </ul>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h3 class="text-xl font-semibold mb-6 text-gray-900">
          Next Components to Explore
        </h3>
        <div class="grid md:grid-cols-2 gap-4">
          <router-link
            to="/props"
            class="group p-6 border border-gray-200 hover:border-blue-300 rounded-2xl transition-all hover:shadow-md"
          >
            <div class="text-blue-600 mb-2">🔗</div>
            <h4 class="font-semibold mb-1">Props &amp; Events</h4>
            <p class="text-gray-500 text-sm">
              Learn how to pass data and communicate between components
            </p>
          </router-link>

          <router-link
            to="/events"
            class="group p-6 border border-gray-200 hover:border-blue-300 rounded-2xl transition-all hover:shadow-md"
          >
            <div class="text-purple-600 mb-2">📡</div>
            <h4 class="font-semibold mb-1">Custom Events</h4>
            <p class="text-gray-500 text-sm">
              Master emitting and listening to custom events
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "ComponentsPage",
  components: { BaseButton },
};
</script>
