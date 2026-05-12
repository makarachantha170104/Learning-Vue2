<template>
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
                'bg-rose-500': status === 'Blocked',
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
</template>

<script>
import draggable from "vuedraggable";
import { mapStores } from "pinia";
import { useProjectStore } from "@/stores/projectStore";
import ProjectCard from "@/components/ProjectCard.vue";

export default {
  name: "ProjectList",
  components: {
    draggable,
    ProjectCard,
  },
  data() {
    return {
      columns: ["Todo", "In Progress", "Blocked", "Completed"],
    };
  },
  computed: {
    ...mapStores(useProjectStore),
  },
  methods: {
    getProjectsByStatus(status) {
      return this.projectStore.filteredProjects.filter(
        (project) => project.status === status,
      );
    },

    onMove(evt, newStatus) {
      const projectId = evt.item.dataset.projectId;
      const project = this.projectStore.projects.find(
        (p) => String(p.id) === String(projectId),
      );

      if (project) {
        const updates = { status: newStatus };

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
      this.$emit("delete", id);
    },

    handleEdit(project) {
      this.$emit("edit", project);
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