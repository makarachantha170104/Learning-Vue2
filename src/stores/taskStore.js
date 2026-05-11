import { defineStore } from "pinia";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [], // [TASK 14] Stores all sub-tasks
  }),
  getters: {
    // [TASK 14] Filter tasks for the specific project
    getTasksByProject: (state) => (projectId) => {
      if (!state.tasks) return [];
      return state.tasks.filter(
        (t) => String(t.projectId) === String(projectId),
      );
    },
    // [TASK 15] Logic to calculate the % of completion
    getProjectProgress: (state) => (projectId) => {
      const projectTasks = state.tasks.filter(
        (t) => String(t.projectId) === String(projectId),
      );
      if (projectTasks.length === 0) return 0;

      const completed = projectTasks.filter((t) => t.completed).length;
      return Math.round((completed / projectTasks.length) * 100);
    },
  },
  actions: {
    // [TASK 14] Create new sub-task
    addTask(projectId, taskName) {
      this.tasks.push({
        id: Date.now(),
        projectId: String(projectId),
        name: taskName,
        completed: false,
      });
    },
    // [TASK 14] Update status (Checkbox)
    toggleTask(taskId) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) task.completed = !task.completed;
    },
    // [TASK 14] Update name (Edit)
    updateTaskName(taskId, newName) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) task.name = newName;
    },
    // [TASK 14] Delete task
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((t) => t.id !== taskId);
    },
  },
});
