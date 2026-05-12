<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-zinc-100 pb-20">
    <!-- Navbar -->
    <nav
      class="bg-white backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 py-5 px-6"
    >
      <div
        class="max-w-[1600px] mx-auto flex items-center justify-between gap-6"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20"
          >
            <span class="text-white text-2xl font-black tracking-tighter"
              >P</span
            >
          </div>
          <h1
            class="text-2xl font-semibold text-slate-900 tracking-tighter hidden md:block"
          >
            Projects
          </h1>
        </div>

        <div
          class="flex flex-1 flex-col sm:flex-row items-center gap-4 w-full max-w-3xl"
        >
          <ProjectSearch class="flex-1" />
          <ProjectFilter class="w-full sm:w-auto" />
        </div>

        <button
          @click="showForm = true"
          class="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-blue-500/30"
        >
          <span class="text-xl leading-none mt-0.5">+</span>
          <span>New Project</span>
        </button>
      </div>
    </nav>

    <ProjectList @delete="handleDelete" @edit="handleEdit" />

    <ProjectForm
      v-if="showForm"
      :visible="showForm"
      :project="editingProject"
      @close="closeForm"
      @save="handleSave"
    />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useProjectStore } from "@/stores/projectStore";
import ProjectList from "@/components/ProjectList.vue";
import ProjectSearch from "@/components/ProjectSearch.vue";
import ProjectFilter from "@/components/ProjectFilter.vue";
import ProjectForm from "@/components/ProjectForm.vue";
import { useTaskStore } from "@/stores/taskStore";

export default {
  name: "Project",
  components: {
    ProjectList,
    ProjectSearch,
    ProjectFilter,
    ProjectForm,
  },
  data() {
    return {
      showForm: false,
      editingProject: null,
    };
  },
  computed: {
    ...mapStores(useProjectStore, useTaskStore),
  },
  methods: {
    handleDelete(id) {
      if (confirm("Are you sure you want to delete this project?")) {
        this.projectStore.deleteProject(id);
        this.taskStore.deleteTasksByProject(id);
      }
    },

    handleEdit(project) {
      this.editingProject = { ...project };
      this.showForm = true;
    },

    handleSave(data) {
      if (this.editingProject) {
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
  },
};
</script>
