<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    <div
      class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4"
    >
      <div
        class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      </div>
      <div>
        <p
          class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
        >
          Total Tasks
        </p>
        <p class="text-2xl font-black text-gray-900">{{ stats.total }}</p>
      </div>
    </div>

    <div
      class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4"
    >
      <div
        class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
      <div>
        <p
          class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
        >
          In Progress
        </p>
        <p class="text-2xl font-black text-gray-900">{{ stats.inProgress }}</p>
      </div>
    </div>

    <div
      class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4"
    >
      <div
        class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <p
          class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
        >
          Finished
        </p>
        <p class="text-2xl font-black text-green-600">{{ stats.completed }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectOverview",
  props: {
    projects: { type: Array, required: true },
  },
  computed: {
    stats() {
      return {
        total: this.projects.length,
        inProgress: this.projects.filter((p) => p.status === "In Progress")
          .length,
        completed: this.projects.filter((p) => p.status === "Completed").length,
      };
    },
  },
};
</script>
