<template>
  <div
    class="bg-white p-4 rounded-xl shadow-sm border border-transparent hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex items-center gap-4"
    @click="
      $router.push({ name: 'project-detail', params: { id: project.id } })
    "
  >
    <div class="flex-shrink-0">
      <div
        @click.stop="markAsDone"
        class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
        :class="
          project.status === 'Completed'
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 bg-white'
        "
      >
        <svg
          v-if="project.status === 'Completed'"
          class="w-3 h-3 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>

    <div class="flex-1 flex justify-between items-center overflow-hidden">
      <h3
        class="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors truncate"
        :class="{
          'line-through text-green-600 opacity-60':
            project.status === 'Completed',
        }"
      >
        {{ project.name }}
      </h3>

      <div
        class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <button
          @click.stop="$emit('edit', project)"
          class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        <button
          @click.stop="$emit('delete', project.id)"
          class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    project: { type: Object, required: true },
  },
  methods: {
    markAsDone() {
      const newStatus =
        this.project.status === "Completed" ? "Todo" : "Completed";
      this.$emit("update-status", { id: this.project.id, status: newStatus });
    },
  },
};
</script>
