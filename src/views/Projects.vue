<template>
  <div class="min-h-screen bg-[#f3f4f6] pb-20">
    <div class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div
        class="max-w-[1600px] mx-auto px-8 py-5 flex justify-between items-center"
      >
        <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Project Board
        </h1>

        <div class="flex items-center gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search tasks..."
            class="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64"
          />
          <button
            @click="openCreateForm"
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold shadow-lg"
          >
            + New Task
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-[1600px] mx-auto px-8 mt-10">
      <ProjectOverview :projects="projectStore.projects" />

      <div class="flex flex-col lg:flex-row gap-6 items-start">
        <div
          v-for="col in columns"
          :key="col"
          class="flex-1 min-w-[350px] bg-gray-200/50 rounded-2xl p-4 min-h-[60vh]"
        >
          <h2
            class="text-xs font-black uppercase tracking-widest text-gray-500 mb-4 px-2"
          >
            {{ col }}
          </h2>

          <draggable
            :list="getTasksByStatus(col)"
            group="project-tasks"
            :animation="300"
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
import ProjectOverview from "@/components/ProjectOverview.vue"; // Import the new component

export default {
  components: { draggable, ProjectCard, ProjectForm, ProjectOverview },
  data() {
    return {
      showForm: false,
      editingProject: null,
      searchQuery: "",
      columns: ["Todo", "In Progress", "Completed"],
    };
  },
  computed: { ...mapStores(useProjectStore) },
  methods: {
    getTasksByStatus(status) {
      return this.projectStore.projects.filter(
        (t) =>
          t.status === status &&
          t.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
    onTaskAdd(evt, newStatus) {
      const taskName = evt.item.querySelector("h3").innerText.trim();
      const task = this.projectStore.projects.find((p) => p.name === taskName);
      if (task) this.projectStore.updateProject(task.id, { status: newStatus });
    },
    quickUpdate({ id, status }) {
      this.projectStore.updateProject(id, { status });
    },
    openCreateForm() {
      this.editingProject = null;
      this.showForm = true;
    },
    openEditForm(task) {
      this.editingProject = { ...task };
      this.showForm = true;
    },
    saveProject(data) {
      this.editingProject
        ? this.projectStore.updateProject(this.editingProject.id, data)
        : this.projectStore.createProject(data);
      this.closeForm();
    },
    closeForm() {
      this.showForm = false;
      this.editingProject = null;
    },
    handleDelete(id) {
      if (confirm("Delete this task?")) this.projectStore.deleteProject(id);
    },
  },
  created() {
    this.projectStore.fetchProjects();
  },
};
</script>
