<template>
  <div class="min-h-screen bg-[#f3f4f6] pb-20">
    <div class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div
        class="max-w-[1600px] mx-auto px-8 py-5 flex justify-between items-center"
      >
        <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span class="text-blue-600">📊</span> Project Board
        </h1>

        <div class="flex items-center gap-4">
          <div class="relative">
            <span
              class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"
              >🔍</span
            >
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search tasks..."
              class="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all"
            />
          </div>
          <button
            @click="openCreateForm"
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            + New Task
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-[1600px] mx-auto px-8 mt-10">
      <div class="flex flex-col lg:flex-row gap-6 items-start">
        <div
          v-for="col in columns"
          :key="col"
          class="flex-1 min-w-[350px] bg-gray-200/50 rounded-2xl p-4 min-h-[75vh]"
        >
          <div class="flex items-center justify-between mb-4 px-2">
            <h2
              class="text-xs font-black uppercase tracking-widest text-gray-500"
            >
              {{ col }}
            </h2>
            <span
              class="bg-white text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm border border-gray-100"
            >
              {{ getTasksByStatus(col).length }}
            </span>
          </div>

          <draggable
            :list="getTasksByStatus(col)"
            group="project-tasks"
            :animation="300"
            ghost-class="opacity-0"
            class="space-y-3 h-full pb-20"
            @add="(evt) => onTaskAdd(evt, col)"
          >
            <ProjectCard
              v-for="task in getTasksByStatus(col)"
              :key="task.id"
              :project="task"
              @edit="openEditForm"
              @delete="handleDelete"
              @update-status="quickUpdate"
            />

            <div
              v-if="getTasksByStatus(col).length === 0"
              class="border-2 border-dashed border-gray-300 rounded-xl py-10 text-center text-gray-400 text-xs font-medium"
            >
              No tasks here
            </div>
          </draggable>
        </div>
      </div>
    </div>

    <ProjectForm
      :visible="showForm"
      :project="editingProject"
      @save="saveProject"
      @close="closeForm"
    />
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapStores } from "pinia";
import { useProjectStore } from "@/stores/projectStore";
import ProjectCard from "@/components/ProjectCard.vue";
import ProjectForm from "@/components/ProjectForm.vue";

export default {
  name: "ProjectsView",
  components: { draggable, ProjectCard, ProjectForm },
  data() {
    return {
      showForm: false,
      editingProject: null,
      searchQuery: "",
      columns: ["Todo", "In Progress", "Completed"],
    };
  },
  computed: {
    ...mapStores(useProjectStore),
  },
  methods: {
    // Task 10: Filtering Logic
    getTasksByStatus(status) {
      if (!this.projectStore.projects) return [];
      return this.projectStore.projects.filter((t) => {
        return (
          t.status === status &&
          t.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },

    // Task 14: Logic for moving tasks via Drag & Drop
    onTaskAdd(evt, newStatus) {
      const taskName = evt.item.querySelector("h3").innerText.trim();
      const task = this.projectStore.projects.find((p) => p.name === taskName);

      if (task) {
        this.projectStore.updateProject(task.id, { status: newStatus });
      }
    },

    // Quick Update for the Radio Button Logic
    quickUpdate({ id, status }) {
      this.projectStore.updateProject(id, { status });
    },

    // Form Management
    openCreateForm() {
      this.editingProject = null;
      this.showForm = true;
    },
    openEditForm(task) {
      this.editingProject = { ...task };
      this.showForm = true;
    },
    saveProject(data) {
      if (this.editingProject && this.editingProject.id) {
        this.projectStore.updateProject(this.editingProject.id, data);
      } else {
        this.projectStore.createProject(data);
      }
      this.closeForm();
    },
    closeForm() {
      this.showForm = false;
      this.editingProject = null;
    },

    // Task 11: Delete Confirmation
    handleDelete(id) {
      if (window.confirm("Are you sure you want to delete this task?")) {
        this.projectStore.deleteProject(id);
      }
    },

    formatDate(date) {
      return date ? new Date(date).toLocaleDateString() : "";
    },
  },
  created() {
    // Task 19: Load persistent data
    this.projectStore.fetchProjects();
  },
};
</script>
