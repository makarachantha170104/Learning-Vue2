<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <span class="font-bold text-3xl tracking-tighter text-gray-900">
            Vue<span class="text-blue-600">2</span>
          </span>
          <span class="text-gray-500 font-medium text-xl">Master</span>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-x-8 text-sm font-medium">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            :class="[
              'py-5 text-gray-600 hover:text-gray-900 transition-colors relative',
              isActive(link.path) && 'text-blue-600 font-semibold',
            ]"
          >
            {{ link.name }}
            <!-- Active underline -->
            <span
              v-if="isActive(link.path)"
              class="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 rounded-full"
            ></span>
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden p-3 text-gray-700 hover:bg-gray-100 rounded-2xl transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.75"
          >
            <path
              v-if="!isOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6h12v12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-white border-t">
      <div class="px-6 py-6 space-y-2">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          @click="closeMenu"
          :class="[
            'block px-6 py-4 text-gray-700 hover:bg-gray-50 rounded-2xl font-medium transition-all',
            isActive(link.path) && 'bg-blue-50 text-blue-600 font-semibold',
          ]"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TheNavbar",
  data() {
    return {
      isOpen: false,
      navLinks: [
        { name: "Home", path: "/" },
        { name: "Components", path: "/components" },
        { name: "Router", path: "/router" },
        { name: "Props", path: "/props" },
        { name: "Events", path: "/events" },
        { name: "Lifecycle", path: "/lifecycle" },
        { name: "State", path: "/state" },
      ],
    };
  },
  computed: {
    currentPath() {
      return this.$route?.path || "/";
    },
  },
  watch: {
    "$route.path"() {
      this.isOpen = false;
    },
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
    isActive(path) {
      if (path === "/") return this.currentPath === "/";
      return (
        this.currentPath === path || this.currentPath.startsWith(path + "/")
      );
    },
  },
};
</script>
