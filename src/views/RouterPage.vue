<template>
  <div class="min-h-screen bg-gray-50 py-12 px-5 sm:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Vue Router <span class="text-blue-600">Basics</span>
        </h1>
        <p class="text-lg text-gray-600">
          Managing navigation and URLs in a Single Page Application (SPA).
        </p>
      </div>

      <!-- Content Cards -->
      <div class="grid gap-8">
        <!-- Section 1: Declarative Navigation -->
        <section
          class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span
              class="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-base"
              >1</span
            >
            Declarative Navigation
          </h2>
          <p class="text-gray-600 mb-4">
            Instead of using standard anchor tags, use
            <code>&lt;router-link&gt;</code> to prevent page reloads.
          </p>
          <div
            class="bg-gray-900 rounded-2xl p-5 font-mono text-sm text-blue-300"
          >
            &lt;router-link to="/about"&gt;Go to About&lt;/router-link&gt;
          </div>
        </section>

        <!-- Section 2: Programmatic Navigation -->
        <section
          class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span
              class="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-base"
              >2</span
            >
            Programmatic Navigation
          </h2>
          <p class="text-gray-600 mb-4">
            You can also navigate using JavaScript inside your methods:
          </p>
          <div
            class="bg-gray-900 rounded-2xl p-5 font-mono text-sm text-green-400"
          >
            this.$router.push('/dashboard');
          </div>
        </section>

        <!-- Section 3: Dynamic Segments -->
        <section
          class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span
              class="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-base"
              >3</span
            >
            Route Parameters
          </h2>
          <p class="text-gray-600 mb-4">
            Access variables in the URL using <code>$route.params</code>.
          </p>
          <div
            class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl italic text-blue-700"
          >
            "Current Route Path: {{ $route.path }}"
          </div>
        </section>
      </div>

      <!-- Back Button -->
      <div class="mt-12">
        <router-link
          to="/"
          class="inline-flex items-center text-blue-600 font-semibold hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RouterPage",
  mounted() {
    console.log("Router view mounted. Current path:", this.$route.path);
  },
};
</script>

<style scoped>
code {
  @apply bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-sm;
}
</style>
