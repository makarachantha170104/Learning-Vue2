import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", {
  state: () => ({
    // Load from localStorage immediately for persistence
    projects: JSON.parse(localStorage.getItem("projects")) || [],
    searchQuery: "",
    statusFilter: "all",
    loading: false,
  }),

  getters: {
    filteredProjects: (state) => {
      let temp = state.projects;
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        temp = temp.filter((p) => p.name.toLowerCase().includes(q));
      }
      if (state.statusFilter !== "all") {
        temp = temp.filter((p) => p.status === state.statusFilter);
      }
      return temp;
    },
  },

  actions: {
    createProject(data) {
      const newProject = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        status: data.status || "Todo",
        createdAt: new Date().toISOString(),
      };
      this.projects.push(newProject);
      this.save();
    },

    updateProject(id, updates) {
      const index = this.projects.findIndex((p) => String(p.id) === String(id));
      if (index !== -1) {
        this.projects.splice(index, 1, { ...this.projects[index], ...updates });
        this.save();
      }
    },

    deleteProject(id) {
      const index = this.projects.findIndex((p) => String(p.id) === String(id));
      if (index !== -1) {
        this.projects.splice(index, 1);
        this.save();
      }
    },

    save() {
      localStorage.setItem("projects", JSON.stringify(this.projects));
    },
  },
});
