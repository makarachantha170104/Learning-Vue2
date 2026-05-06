<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <!-- Hero Section -->
    <div class="pt-20 pb-16 px-4">
      <div class="max-w-5xl mx-auto text-center">
        <div
          class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mb-6"
        >
          <span class="text-blue-600">🚀</span>
          <span class="text-sm font-medium text-gray-600"
            >Vue 2 Mastery Journey</span
          >
        </div>

        <h1
          class="text-5xl md:text-6xl font-bold text-gray-900 tracking-tighter mb-6"
        >
          Master Vue 2<br />
          <span class="text-blue-600">The Right Way</span>
        </h1>

        <p
          class="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed mb-10"
        >
          A complete interactive learning experience covering all the
          fundamentals of Vue 2 — from components to state management.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/components"
            class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
          >
            Start Learning
            <span>→</span>
          </router-link>

          <router-link
            to="/state"
            class="px-8 py-4 border border-gray-300 hover:border-gray-400 font-medium rounded-2xl transition-all"
          >
            Explore State Management
          </router-link>
        </div>
      </div>
    </div>

    <!-- What You'll Learn -->
    <div class="max-w-5xl mx-auto px-4 pb-20">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
        What You'll Master
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
        >
          <div
            class="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform"
          >
            🧩
          </div>
          <h3 class="text-2xl font-semibold mb-3">Components</h3>
          <p class="text-gray-600">
            Build reusable, maintainable components with proper structure and
            best practices.
          </p>
        </div>

        <div
          class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
        >
          <div
            class="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform"
          >
            🔗
          </div>
          <h3 class="text-2xl font-semibold mb-3">Props &amp; Events</h3>
          <p class="text-gray-600">
            Master parent-child communication using props and custom events.
          </p>
        </div>

        <div
          class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
        >
          <div
            class="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform"
          >
            🔄
          </div>
          <h3 class="text-2xl font-semibold mb-3">Lifecycle Hooks</h3>
          <p class="text-gray-600">
            Understand when and how to use each lifecycle hook effectively.
          </p>
        </div>

        <div
          class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
        >
          <div
            class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform"
          >
            📊
          </div>
          <h3 class="text-2xl font-semibold mb-3">State Management</h3>
          <p class="text-gray-600">
            Learn reactive data, computed properties, watchers, and more.
          </p>
        </div>

        <div
          class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
        >
          <div
            class="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform"
          >
            ⚡
          </div>
          <h3 class="text-2xl font-semibold mb-3">Reactivity</h3>
          <p class="text-gray-600">
            Deep dive into Vue 2's reactivity system and best practices.
          </p>
        </div>

        <div
          class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
        >
          <div
            class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform"
          >
            🛠️
          </div>
          <h3 class="text-2xl font-semibold mb-3">Best Practices</h3>
          <p class="text-gray-600">
            Real-world patterns, performance tips, and clean code principles.
          </p>
        </div>
      </div>
    </div>

    <!-- Footer CTA -->
    <div class="bg-gray-900 text-white py-16">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h2 class="text-4xl font-bold mb-4">Ready to become a Vue 2 Master?</h2>
        <p class="text-gray-400 mb-8 text-lg">
          Start with the Components section and build your foundation step by
          step.
        </p>
        <router-link
          to="/components"
          class="inline-block px-10 py-4 bg-white text-gray-900 font-semibold rounded-2xl hover:bg-gray-100 transition-all text-lg"
        >
          Begin Your Journey →
        </router-link>
      </div>
    </div>
  </div>
</template>
