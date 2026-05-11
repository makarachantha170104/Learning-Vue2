<template>
  <div class="relative flex-1 group">
    <svg
      class="absolute left-4 top-4 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <input
      :value="projectStore.searchQuery"
      @input="updateSearch"
      type="text"
      placeholder="Search projects by name..."
      class="w-full bg-white border border-gray-200 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm font-medium text-gray-700"
    />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useProjectStore } from "@/stores/projectStore";

export default {
  name: "ProjectSearch",
  computed: {
    ...mapStores(useProjectStore),
  },
  methods: {
    updateSearch(e) {
      this.projectStore.searchQuery = e.target.value;
    },
  },
};
</script>
