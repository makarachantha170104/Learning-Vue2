import { defineStore } from "pinia";
import { Project } from "../models/project";

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: [],
    searchQuery: "",
    statusFilter: "all",
    loading: false,
  }),

  getters: {
    // This is what powers your real-time search and filter
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
    fetchProjects() {
      const saved = localStorage.getItem("projects");
      if (saved) {
        try {
          this.projects = JSON.parse(saved);
        } catch (e) {
          this.projects = [];
        }
      }
    },

    // ... inside actions
    createProject(data) {
      const newProject = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        status: data.status || "Todo", // Default to first column
        createdAt: new Date().toISOString(),
      };
      this.projects.push(newProject);
      this.save();
    },

    updateProject(id, updates) {
      const index = this.projects.findIndex((p) => p.id === id);
      if (index !== -1) {
        // We use Vue.set or spread to ensure Vue 2 detects the change
        this.projects.splice(index, 1, { ...this.projects[index], ...updates });
        this.save();
      }
    },

    deleteProject(id) {
      // Find the index first
      const index = this.projects.findIndex((p) => p.id === id);
      if (index !== -1) {
        // Use splice to ensure Vue 2 detects the array change immediately
        this.projects.splice(index, 1);
        this.save(); // Sync with localStorage
      }
    },
    save() {
      localStorage.setItem("projects", JSON.stringify(this.projects));
    },
  },
});
