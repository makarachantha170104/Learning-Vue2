<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div class="px-8 py-6 border-b border-gray-100">
          <h2 class="text-2xl font-bold text-gray-800">
            {{ project ? "Edit Project" : "New Project" }}
          </h2>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2"
              >Project Name</label
            >
            <input
              v-model="formData.name"
              required
              placeholder="e.g. SaaS Dashboard"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2"
              >Description</label
            >
            <textarea
              v-model="formData.description"
              rows="3"
              placeholder="What is this project about?"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2"
              >Status</label
            >
            <select
              v-model="formData.status"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none cursor-pointer"
            >
              <option>Todo</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="px-5 py-2.5 text-gray-500 font-medium hover:bg-gray-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md transition-all"
            >
              {{ project ? "Update" : "Create" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["visible", "project"],
  data() {
    return {
      formData: { name: "", description: "", status: "Todo" },
    };
  },
  watch: {
    project: {
      immediate: true,
      handler(newVal) {
        if (newVal) this.formData = { ...newVal };
        else this.formData = { name: "", description: "", status: "Todo" };
      },
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("save", this.formData);
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
