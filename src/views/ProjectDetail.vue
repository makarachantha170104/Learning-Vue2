<template>
  <div class="min-h-screen bg-[#f3f4f6] pb-20">
    <div class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div
        class="max-w-[1000px] mx-auto px-8 py-5 flex justify-between items-center"
      >
        <button
          @click="$router.push('/')"
          class="text-blue-600 font-bold flex items-center gap-2 hover:underline"
        >
          ← Back to Board
        </button>
        <h1 class="text-xl font-bold text-gray-900">Project Details</h1>
        <div class="w-20"></div>
      </div>
    </div>

    <div class="max-w-[1000px] mx-auto px-8 mt-10" v-if="project">
      <div class="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
        <span
          :class="statusClass"
          class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-6"
        >
          {{ project.status }}
        </span>

        <h2 class="text-4xl font-black text-gray-900 mb-4">
          {{ project.name }}
        </h2>
        <p
          class="text-gray-500 text-lg leading-relaxed mb-10 pb-10 border-b border-gray-100"
        >
          {{ project.description || "No description provided for this task." }}
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase mb-1">
              Task ID
            </p>
            <p class="font-mono text-gray-700">
              #{{ project.id.toString().slice(-6) }}
            </p>
          </div>
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase mb-1">
              Created At
            </p>
            <p class="text-gray-700">
              {{ new Date(project.createdAt).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center mt-20">
      <h2 class="text-2xl font-bold text-gray-400">Project not found.</h2>
      <button @click="$router.push('/')" class="mt-4 text-blue-600 underline">
        Return Home
      </button>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useProjectStore } from "@/stores/projectStore";

export default {
  name: "ProjectDetail",
  props: ["id"], // Received from router
  computed: {
    ...mapStores(useProjectStore),
    project() {
      // Find the specific project in the store using the ID from the URL
      return this.projectStore.projects.find((p) => p.id === this.id);
    },
    statusClass() {
      if (!this.project) return "";
      if (this.project.status === "Completed")
        return "bg-green-100 text-green-700";
      if (this.project.status === "In Progress")
        return "bg-blue-100 text-blue-700";
      return "bg-gray-100 text-gray-600";
    },
  },
  created() {
    // Ensure projects are loaded if user refreshes this page
    if (this.projectStore.projects.length === 0) {
      this.projectStore.fetchProjects();
    }
  },
};
</script>
