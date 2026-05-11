<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-gray-800 text-white shadow-md">
      <div
        class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold">Project Management</h1>
        </div>

        <div class="flex items-center gap-6">
          <router-link
            to="/projects"
            class="hover:text-emerald-400 transition-colors font-medium"
          >
            All Projects
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-6 py-8">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
