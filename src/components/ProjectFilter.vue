<template>
  <select
    :value="projectStore.statusFilter"
    @change="updateFilter"
    class="bg-white border border-gray-200 px-6 py-3.5 rounded-2xl outline-none font-bold text-gray-600 shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all appearance-none"
  >
    <option value="all">All Status</option>
    <option value="Todo">Todo</option>
    <option value="In Progress">In Progress</option>
    <option value="Blocked">Blocked</option>
    <option value="Completed">Completed</option>
  </select>
</template>

<script>
import { mapStores } from "pinia";
import { useProjectStore } from "@/stores/projectStore";

export default {
  name: "ProjectFilter",
  computed: {
    ...mapStores(useProjectStore),
  },
  methods: {
    updateFilter(e) {
      this.projectStore.statusFilter = e.target.value;
    },
  },
};
</script>
