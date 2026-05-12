<template>
  <div
    class="relative bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all duration-300 group cursor-pointer active:scale-[0.98] overflow-hidden"
    :data-project-id="project.id"
    @click="goToDetail"
  >
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style="
        background: radial-gradient(
          circle at center,
          rgba(59, 130, 246, 0.04) 0%,
          transparent 75%
        );
      "
    ></div>

    <div class="relative z-10 flex flex-col gap-4">
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-3 overflow-hidden">
          <!-- mask task as done -->
          <button
            @click.stop="toggleQuickDone"
            class="w-6 h-6 rounded-xl border-2 flex-shrink-0 flex items-center justify-center transition-all shadow-sm"
            :class="
              project.status === 'Completed'
                ? 'bg-green-500 border-green-500'
                : 'border-gray-200 bg-white group-hover:border-blue-400'
            "
          >
            <svg
              v-if="project.status === 'Completed'"
              class="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>

          <!-- display name -->
          <h3
            class="font-black text-gray-800 truncate group-hover:text-blue-600 transition-colors"
            :class="{
              'line-through text-gray-400 opacity-60':
                project.status === 'Completed',
            }"
          >
            {{ project.name }}
          </h3>
        </div>

        <!-- edit and delete buttons -->
        <div
          class="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
        >
          <button
            @click.stop="$emit('edit', project)"
            class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            title="Edit Project"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            @click.stop="$emit('delete', project.id)"
            class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            title="Delete Project"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- progress bar -->
      <div class="bg-gray-50/50 p-4 rounded-[1.8rem] border border-gray-50">
        <div class="flex justify-between items-center mb-2">
          <span
            class="text-[10px] font-black text-gray-400 uppercase tracking-widest"
            >Progress</span
          >
          <span class="text-[10px] font-black text-blue-600"
            >{{ displayProgress }}%</span
          >
        </div>
        <div class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div
            class="h-full transition-all duration-700 ease-out"
            :class="
              project.status === 'Completed' ? 'bg-green-500' : 'bg-blue-600'
            "
            :style="{ width: displayProgress + '%' }"
          ></div>
        </div>

        <div v-if="hasSubTasks" class="mt-2.5 flex items-center gap-1.5">
          <div class="flex gap-0.5">
            <div
              v-for="(t, i) in project.tasks"
              :key="i"
              class="w-1.5 h-1.5 rounded-full"
              :class="t.completed ? 'bg-green-500' : 'bg-gray-300'"
            ></div>
          </div>
          <span
            class="text-[9px] font-bold text-gray-400 uppercase tracking-tight"
          >
            {{ completedCount }}/{{ project.tasks.length }} Tasks
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: { type: Object, required: true },
  },
  computed: {
    hasSubTasks() {
      return this.project.tasks && this.project.tasks.length > 0;
    },
    completedCount() {
      return this.hasSubTasks
        ? this.project.tasks.filter((t) => t.completed).length
        : 0;
    },
    displayProgress() {
      if (this.hasSubTasks) {
        return Math.round(
          (this.completedCount / this.project.tasks.length) * 100,
        );
      }
      return this.project.progress || 0;
    },
  },
  methods: {
    goToDetail() {
      this.$router.push(`/project/${this.project.id}/detail`);
    },
    toggleQuickDone() {
      const isDone = this.project.status === "Completed";
      this.$emit("update-status", {
        id: this.project.id,
        status: isDone ? "Todo" : "Completed",
        progress: isDone ? 0 : 100,
      });
    },
  },
};
</script>
