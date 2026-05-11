import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: [],
    loading: false,
    error: null,
  }),

  getters: {
    getAllProjects: (state) => state.projects,
    getProjectById: (state) => (id) => state.projects.find((p) => p.id === id),
  },

  actions: {
    async fetchProjects() {
      this.loading = true;
      // TODO: later connect to localStorage or API
      this.projects = [];
      this.loading = false;
    },
  },
});
