<template>
  <div class="min-h-screen bg-[#f3f4f6] pb-20">
    <div class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div
        class="max-w-[800px] mx-auto px-4 sm:px-8 py-5 flex justify-between items-center"
      >
        <button
          @click="$router.push('/')"
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
      class="max-w-[800px] mx-auto px-4 sm:px-8 mt-6 sm:mt-10"
      v-if="project"
    >
      <div
        class="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6"
      >
        <div class="flex justify-between items-end mb-4">
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
        <div
          class="w-full h-2.5 sm:h-3 bg-gray-100 rounded-full overflow-hidden"
        >
          <div
            class="h-full bg-blue-600 transition-all duration-700 ease-in-out"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>

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

      <div
        class="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100"
      >
        <h3
          class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"
        >
          Sub-tasks Checklist
        </h3>

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
            class="bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 w-full sm:w-auto"
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
                class="min-w-[24px] min-h-[24px] w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all"
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
              >
                {{ task.name }}
              </span>
            </div>

            <div
              class="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ml-2"
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
// [TASK 16]: Import the reusable component
import StatusBadge from "@/components/StatusBadge.vue";
import { mapStores } from "pinia";
import { useProjectStore } from "@/stores/projectStore";
import { useTaskStore } from "@/stores/taskStore";

export default {
  name: "ProjectDetail",
  props: ["id"],
  components: {
    StatusBadge, // [TASK 16]: Registering the component
  },
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
      if (!this.projectStore) return null;
      return this.projectStore.projects.find(
        (p) => String(p.id) === String(this.id),
      );
    },

    subTasks() {
      if (!this.taskStore) return [];
      return this.taskStore.getTasksByProject(this.id);
    },

    progress() {
      if (
        this.taskStore &&
        typeof this.taskStore.getProjectProgress === "function"
      ) {
        return this.taskStore.getProjectProgress(this.id);
      }
      return 0;
    },
  },
  methods: {
    syncProjectStatus() {
      const p = this.progress;
      let newStatus = "Todo";
      if (p === 100) newStatus = "Completed";
      else if (p > 0) newStatus = "In Progress";
      this.projectStore.updateProject(this.id, { status: newStatus });
    },

    handleAddTask() {
      if (!this.newTaskName.trim() || !this.taskStore) return;
      this.taskStore.addTask(this.id, this.newTaskName);
      this.newTaskName = "";
      this.$nextTick(() => this.syncProjectStatus());
    },

    toggleAndSync(taskId) {
      this.taskStore.toggleTask(taskId);
      this.$nextTick(() => this.syncProjectStatus());
    },

    deleteAndSync(taskId) {
      this.taskStore.deleteTask(taskId);
      this.$nextTick(() => this.syncProjectStatus());
    },

    startEdit(task) {
      this.editingTaskId = task.id;
      this.editTaskBuffer = task.name;
      this.$nextTick(() => {
        if (this.$refs.editInput && this.$refs.editInput[0])
          this.$refs.editInput[0].focus();
      });
    },

    saveEdit(taskId) {
      if (this.editTaskBuffer.trim())
        this.taskStore.updateTaskName(taskId, this.editTaskBuffer);
      this.editingTaskId = null;
      this.$nextTick(() => this.syncProjectStatus());
    },
  },
};
</script>
