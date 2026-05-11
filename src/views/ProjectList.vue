<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-zinc-100 pb-20">
    <!-- Navbar -->
    <nav
      class="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 py-5 px-6"
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

        <ProjectSearch class="max-w-xl w-full" />

        <button
          @click="showForm = true"
          class="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-blue-500/30"
        >
          <span class="text-xl leading-none mt-0.5">+</span>
          <span>New Project</span>
        </button>
      </div>
    </nav>

    <main class="max-w-[1600px] mx-auto px-6 pt-10">
      <div
        class="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
      >
        <div
          v-for="status in columns"
          :key="status"
          class="flex-1 min-w-[340px] snap-start"
        >
          <!-- Column Header -->
          <div class="flex items-center justify-between mb-6 px-2">
            <div class="flex items-center gap-3">
              <div
                class="w-3 h-3 rounded-full ring-2 ring-white shadow"
                :class="{
                  'bg-slate-400': status === 'Todo',
                  'bg-amber-500': status === 'In Progress',
                  'bg-emerald-500': status === 'Completed',
                }"
              ></div>
              <h2 class="font-semibold text-slate-700 text-lg tracking-tight">
                {{ status }}
              </h2>
            </div>

            <div
              class="bg-white text-slate-500 text-sm font-medium px-3.5 py-1 rounded-full shadow-sm"
            >
              {{ getProjectsByStatus(status).length }}
            </div>
          </div>

          <!-- Draggable Column -->
          <draggable
            :list="getProjectsByStatus(status)"
            group="projects"
            :animation="300"
            ghost-class="draggable-ghost"
            drag-class="draggable-drag"
            chosen-class="draggable-chosen"
            class="space-y-4 min-h-[65vh] bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 hover:border-slate-300 transition-all"
            @add="(evt) => onMove(evt, status)"
          >
            <ProjectCard
              v-for="project in getProjectsByStatus(status)"
              :key="project.id"
              :project="project"
              @update-status="handleUpdateStatus"
              @delete="handleDelete"
              @edit="handleEdit"
            />

            <!-- Empty State -->
            <div
              v-if="getProjectsByStatus(status).length === 0"
              class="flex flex-col items-center justify-center py-20 text-center border border-dashed border-slate-300 rounded-3xl bg-white/30"
            >
              <div
                class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 6v12m-3-9h6m-6 6h6"
                  />
                </svg>
              </div>
              <p class="text-slate-400 font-medium text-sm">No projects yet</p>
              <p class="text-slate-400 text-xs mt-1">Drag cards here</p>
            </div>
          </draggable>
        </div>
      </div>
    </main>

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
import draggable from "vuedraggable";
import { mapStores } from "pinia";
import { useProjectStore } from "@/stores/projectStore";
import ProjectCard from "@/components/ProjectCard.vue";
import ProjectSearch from "@/components/ProjectSearch.vue";
import ProjectForm from "@/components/ProjectForm.vue";

export default {
  name: "ProjectList",
  components: {
    draggable,
    ProjectCard,
    ProjectSearch,
    ProjectForm,
  },
  data() {
    return {
      showForm: false,
      editingProject: null,
      columns: ["Todo", "In Progress", "Completed"],
    };
  },
  computed: {
    ...mapStores(useProjectStore),
  },
  methods: {
    getProjectsByStatus(status) {
      const query = this.projectStore.searchQuery.toLowerCase();
      return this.projectStore.projects.filter((p) => {
        const matchesStatus = p.status === status;
        const matchesSearch = p.name.toLowerCase().includes(query);
        return matchesStatus && matchesSearch;
      });
    },

    onMove(evt, newStatus) {
      const projectName = evt.item.querySelector("h3")?.innerText.trim();
      const project = this.projectStore.projects.find(
        (p) => p.name === projectName,
      );

      if (project) {
        let updates = { status: newStatus };

        if (newStatus === "Completed") updates.progress = 100;
        if (newStatus === "Todo" && project.progress === 100)
          updates.progress = 0;

        this.projectStore.updateProject(project.id, updates);
      }
    },

    handleUpdateStatus({ id, status, progress }) {
      const project = this.projectStore.projects.find((p) => p.id === id);
      if (!project) return;

      const updates = { status, progress };

      if (project.tasks && project.tasks.length > 0) {
        updates.tasks = project.tasks.map((task) => ({
          ...task,
          completed: status === "Completed",
        }));
      }

      this.projectStore.updateProject(id, updates);
    },

    handleDelete(id) {
      if (confirm("Are you sure you want to delete this project?")) {
        this.projectStore.deleteProject(id);
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

<style scoped>
/* Draggable Fixes */
.draggable-ghost {
  opacity: 0.4;
  transform: scale(0.95);
  background: #f0f9ff !important;
  border: 2px dashed #60a5fa !important;
  border-radius: 1.5rem;
}

.draggable-drag {
  transform: rotate(2deg);
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.4) !important;
}

.draggable-chosen {
  opacity: 0.85;
}
</style>
