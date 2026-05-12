<template>
  <div class="min-h-screen bg-[#f3f4f6] pb-20">
    <div class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div
        class="max-w-[800px] mx-auto px-4 sm:px-8 py-5 flex justify-between items-center"
      >
        <button
          @click="$router.push('/projects')"
          class="text-gray-500 font-bold flex items-center gap-2 hover:text-blue-600 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span class="hidden sm:inline text-sm">Back to Board</span>
        </button>
        <span
          class="text-[9px] sm:text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]"
          >Project Detail</span
        >
        <div class="w-8 sm:w-10"></div>
      </div>
    </div>

    <div
      v-if="projectStore.loading"
      class="flex flex-col items-center justify-center pt-32"
    >
      <div
        class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-gray-400 font-black text-[10px] uppercase tracking-widest">
        Syncing with Store...
      </p>
    </div>

    <div
      v-else-if="projectStore.error || !project"
      class="max-w-[500px] mx-auto px-8 mt-20 text-center"
    >
      <div class="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
        <div class="text-6xl mb-6">🔍</div>
        <h2 class="text-2xl font-black text-gray-900">Project Not Found</h2>
        <p class="text-gray-500 mt-2 mb-8 text-sm">
          The project you are looking for might have been deleted or moved.
        </p>
        <button
          @click="$router.push('/projects')"
          class="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          Back to Projects
        </button>
      </div>
    </div>

    <div
      v-else
      class="max-w-[800px] mx-auto px-4 sm:px-8 mt-6 sm:mt-10 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      <!-- state component form projectOverview -->
      <ProjectOverview :project="project" />

      <!-- project name and progress percentage -->
      <div
        class="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6"
      >
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6"
        >
          <div>
            <h2
              class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight"
            >
              {{ project.name }}
            </h2>
            <p
              class="text-gray-400 font-bold text-[9px] uppercase tracking-widest mt-1"
            >
              Completion Progress
            </p>
          </div>
          <div class="text-right">
            <span class="text-3xl sm:text-4xl font-black text-blue-600"
              >{{ progress }}%</span
            >
          </div>
        </div>
        <div class="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-blue-600 transition-all duration-1000 ease-out"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>

      <!-- project description-->
      <div
        class="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6"
      >
        <div class="flex justify-between items-center mb-6">
          <StatusBadge :status="project.status" />
        </div>
        <p class="text-gray-500 text-base sm:text-lg leading-relaxed">
          {{ project.description || "No description provided." }}
        </p>
      </div>

      <!-- sub task checklist -->
      <div
        class="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100"
      >
        <h3 class="text-lg font-bold text-gray-900 mb-6">
          Sub-tasks Checklist
        </h3>

        <!-- Add new Task input -->
        <div class="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            v-model="newTaskName"
            @keyup.enter="handleAddTask"
            type="text"
            placeholder="Add a new sub-task..."
            class="flex-1 px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          />
          <button
            @click="handleAddTask"
            class="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all w-full sm:w-auto shadow-lg shadow-blue-100"
          >
            Add Task
          </button>
        </div>

        <div class="space-y-3">
          <div
            v-for="task in subTasks"
            :key="task.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100"
          >
            <div class="flex items-center gap-4 flex-1">
              <div
                @click="toggleAndSync(task.id)"
                class="min-w-[24px] w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all"
                :class="
                  task.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-200 bg-white'
                "
              >
                <svg
                  v-if="task.completed"
                  class="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <input
                v-if="editingTaskId === task.id"
                v-model="editTaskBuffer"
                @keyup.enter="saveEdit(task.id)"
                @blur="saveEdit(task.id)"
                ref="editInput"
                class="flex-1 bg-white border border-blue-400 rounded-lg px-3 py-1 outline-none font-semibold text-sm"
              />
              <span
                v-else
                class="font-semibold transition-all text-sm sm:text-base"
                :class="
                  task.completed
                    ? 'text-gray-300 line-through'
                    : 'text-gray-700'
                "
                >{{ task.name }}</span
              >
            </div>

            <!-- Task list with edit/delete options -->
            <div
              class="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
            >
              <button
                @click="startEdit(task)"
                class="p-2 text-gray-400 hover:text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <button
                @click="deleteAndSync(task.id)"
                class="p-2 text-gray-400 hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectOverview from "@/components/ProjectOverview.vue";
import ProjectStatusBadge from "@/components/ProjectStatusBadge.vue";
import { mapStores } from "pinia";
import { useProjectStore } from "@/stores/projectStore";
import { useTaskStore } from "@/stores/taskStore";

export default {
  name: "ProjectDetail",
  props: ["id"],
  components: { ProjectOverview, ProjectStatusBadge },
  data() {
    return {
      newTaskName: "",
      editingTaskId: null,
      editTaskBuffer: "",
    };
  },
  computed: {
    ...mapStores(useProjectStore, useTaskStore),
    project() {
      return this.projectStore.projects.find(
        (p) => String(p.id) === String(this.id),
      );
    },
    subTasks() {
      return this.taskStore.getTasksByProject(this.id);
    },
    progress() {
      return this.taskStore &&
        typeof this.taskStore.getProjectProgress === "function"
        ? this.taskStore.getProjectProgress(this.id)
        : 0;
    },
  },
  methods: {
    /**
     * Syncs the task-based progress and status back to the main Project Store.
     * This is what updates the progress bar on the Kanban card.
     */
    syncProjectStatus() {
      const currentProgress = this.progress; // Calculated from the taskStore getter

      // Determine the status based on percentage
      let newStatus = "Todo";
      if (currentProgress === 100) {
        newStatus = "Completed";
      } else if (currentProgress > 0) {
        newStatus = "In Progress";
      }

      // Update the Project Store. We include the 'tasks' array so the
      // Project Card can show the little progress dots.
      this.projectStore.updateProject(this.id, {
        status: newStatus,
        progress: currentProgress,
        tasks: this.subTasks,
      });
    },

    /**
     * Adds a new sub-task and triggers a sync.
     */
    async handleAddTask() {
      const name = this.newTaskName.trim();
      if (!name) return;

      try {
        await this.taskStore.addTask(this.id, name);
        this.newTaskName = "";

        // Wait for DOM/Store update then sync
        this.$nextTick(() => {
          this.syncProjectStatus();
        });
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    },

    /**
     * Toggles a task's completion status and updates the project percentage.
     */
    async toggleAndSync(taskId) {
      try {
        await this.taskStore.toggleTask(taskId);
        this.syncProjectStatus();
      } catch (error) {
        console.error("Failed to toggle task:", error);
      }
    },

    /**
     * Deletes a task and recalculates the project percentage.
     */
    async deleteAndSync(taskId) {
      if (confirm("Are you sure you want to delete this sub-task?")) {
        try {
          await this.taskStore.deleteTask(taskId);
          this.syncProjectStatus();
        } catch (error) {
          console.error("Failed to delete task:", error);
        }
      }
    },

    /**
     * Opens the inline editor for a task name.
     */
    startEdit(task) {
      this.editingTaskId = task.id;
      this.editTaskBuffer = task.name;
      // Focus the input field once it appears in the DOM
      this.$nextTick(() => {
        const input = this.$refs.editInput;
        if (input && input[0]) input[0].focus();
      });
    },

    /**
     * Saves the edited task name and triggers a sync.
     */
    async saveEdit(taskId) {
      const newName = this.editTaskBuffer.trim();
      if (newName && this.editingTaskId) {
        try {
          await this.taskStore.updateTaskName(taskId, newName);
          this.syncProjectStatus();
        } catch (error) {
          console.error("Failed to update task name:", error);
        }
      }
      this.editingTaskId = null;
    },
  },
  async created() {
    // [TASK 18]: Load data on component creation
    await this.projectStore.fetchProjectById(this.id);
  },
};
</script>
