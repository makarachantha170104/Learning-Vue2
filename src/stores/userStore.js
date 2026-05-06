import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: "No User Loaded",
    status: "Idle",
  }),

  getters: {
    isOnline: (state) => state.status === "Online",
    isLoading: (state) => state.status === "Searching...",
  },

  // Actions can be asynchronous and can modify the state
  actions: {
    async refreshUser() {
      this.user = "Loading...";
      this.status = "Searching...";

      await new Promise((resolve) => setTimeout(resolve, 1500));

      this.user = "Alex Vue";
      this.status = "Online";
    },

    resetUser() {
      this.user = "No User Loaded";
      this.status = "Idle";
    },
  },
});
