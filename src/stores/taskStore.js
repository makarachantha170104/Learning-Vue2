import { defineStore } from "pinia";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [
      { id: 1, name: "Setup Project", status: "Todo" },
      { id: 2, name: "Install Pinia", status: "In Progress" },
      { id: 3, name: "Deploy App", status: "Completed" },
    ],
  }),
  actions: {
    updateTaskStatus(taskId, newStatus) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) task.status = newStatus;
      // Save to localStorage here if needed
    },
  },
});
