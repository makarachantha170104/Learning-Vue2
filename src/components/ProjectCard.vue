<template>
  <div
    class="bg-white p-4 rounded-xl shadow-sm border border-transparent hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex items-center gap-4"
    @click="
      $router.push({ name: 'project-detail', params: { id: project.id } })
    "
  >
    <div class="flex-shrink-0">
      <input
        type="radio"
        :checked="project.status === 'Completed'"
        @click.stop="markAsDone"
        class="w-5 h-5 cursor-pointer accent-green-600 hover:scale-110 transition-transform border-gray-300"
      />
    </div>

    <div class="flex-1 flex justify-between items-center overflow-hidden">
      <h3
        class="font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate"
        :class="{
          'line-through text-green-600 font-medium opacity-75':
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
          class="p-1 text-gray-400 hover:text-blue-600 transition-colors"
        >
          ✏️
        </button>
        <button
          @click.stop="$emit('delete', project.id)"
          class="p-1 text-gray-400 hover:text-red-500 transition-colors"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  methods: {
    markAsDone() {
      // Toggle status to Completed or back to Todo if already done
      const newStatus =
        this.project.status === "Completed" ? "Todo" : "Completed";
      this.$emit("update-status", { id: this.project.id, status: newStatus });
    },
  },
};
</script>
