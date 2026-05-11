<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <h1 class="text-3xl font-bold mb-10 text-gray-800">Project Board</h1>

    <div class="flex gap-6 overflow-x-auto pb-4">
      <div
        v-for="column in columns"
        :key="column"
        class="flex-1 min-w-[300px] bg-gray-100 rounded-2xl p-4"
      >
        <h2
          class="text-sm font-black uppercase tracking-widest text-gray-500 mb-4 px-2"
        >
          {{ column }} · {{ getTasksByStatus(column).length }}
        </h2>

        <draggable
          class="space-y-4 min-h-[500px]"
          :list="getTasksByStatus(column)"
          group="tasks"
          @change="(evt) => handleMove(evt, column)"
        >
          <div
            v-for="task in getTasksByStatus(column)"
            :key="task.id"
            class="bg-white p-5 rounded-xl shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:border-blue-400 transition-colors"
          >
            <h3 class="font-bold text-gray-800">{{ task.name }}</h3>
            <p class="text-xs text-gray-400 mt-2">ID: #{{ task.id }}</p>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { useTaskStore } from "@/stores/taskStore";

export default {
  components: { draggable },
  data() {
    return {
      columns: ["Todo", "In Progress", "Completed"],
    };
  },
  computed: {
    taskStore() {
      return useTaskStore();
    },
  },
  methods: {
    getTasksByStatus(status) {
      return this.taskStore.tasks.filter((t) => t.status === status);
    },
    handleMove(evt, newStatus) {
      // When a task is added to a new column
      if (evt.added) {
        const task = evt.added.element;
        this.taskStore.updateTaskStatus(task.id, newStatus);
      }
    },
  },
};
</script>
