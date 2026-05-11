import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: JSON.parse(localStorage.getItem("projects")) || [],
    searchQuery: "",
    statusFilter: "all",
    loading: false,
    error: null,
  }),

  getters: {
    // REQUIREMENT: Search by name & Filter by status
    filteredProjects: (state) => {
      return state.projects.filter((p) => {
        const matchesSearch = p.name
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());
        const matchesStatus =
          state.statusFilter === "all" || p.status === state.statusFilter;
        return matchesSearch && matchesStatus;
      });
    },

    // REQUIREMENT: Progress % and Status Statistics
    stats: (state) => {
      const total = state.projects.length;
      const completed = state.projects.filter(
        (p) => p.status === "Completed",
      ).length;
      const inProgress = state.projects.filter(
        (p) => p.status === "In Progress",
      ).length;
      const blocked = state.projects.filter(
        (p) => p.status === "Blocked",
      ).length;
      const todo = state.projects.filter((p) => p.status === "Todo").length;

      return {
        total,
        completed,
        inProgress,
        blocked,
        todo,
        // Overall average progress of all projects
        avgProgress:
          total > 0
            ? Math.round(
                state.projects.reduce((acc, p) => acc + (p.progress || 0), 0) /
                  total,
              )
            : 0,
      };
    },
  },

  actions: {
    async fetchProjectById(id) {
      this.loading = true;
      this.error = null;
      await new Promise((resolve) => setTimeout(resolve, 600));
      const project = this.projects.find((p) => String(p.id) === String(id));
      if (!project) this.error = "Project not found";
      this.loading = false;
      return project;
    },

    // REQUIREMENT: Create project with all required fields
    createProject(data) {
      const newProject = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        status: "Todo", // Default status
        progress: 0, // REQUIREMENT: Progress % field
        tasks: [], // REQUIREMENT: Task reference
        createdAt: new Date().toISOString(),
      };
      this.projects.push(newProject);
      this.save();
    },

    // REQUIREMENT: Update project (Handles name, description, status, and tasks)
    updateProject(id, updates) {
      const index = this.projects.findIndex((p) => String(p.id) === String(id));
      if (index !== -1) {
        // We use spread to ensure we don't lose the 'tasks' array when updating just the name
        this.projects.splice(index, 1, { ...this.projects[index], ...updates });
        this.save();
      }
    },

    // REQUIREMENT: Delete project
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
