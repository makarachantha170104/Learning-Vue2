<template>
  <div
    class="p-4 md:p-10 font-sans min-h-screen bg-gray-50 flex items-center justify-center"
  >
    <div
      class="max-w-2xl w-full bg-white border border-gray-100 shadow-2xl rounded-3xl p-8"
    >
      <div class="grid md:grid-cols-2 gap-8">
        <!-- LEFT COLUMN: UI & Controls -->
        <div>
          <!-- Displaying the Formatted State -->
          <div
            class="text-center mb-8 bg-blue-50 p-6 rounded-2xl border border-blue-100"
          >
            <h1
              class="text-blue-400 uppercase text-xs font-bold tracking-widest mb-2"
            >
              User Interface
            </h1>
            <p class="text-3xl font-black text-blue-700 mb-3">{{ user }}</p>
            <span
              class="text-sm px-4 py-1.5 rounded-full font-bold transition-colors duration-300"
              :class="
                status === 'Online'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-white text-blue-500 shadow-sm'
              "
            >
              Status: {{ status }}
            </span>
          </div>

          <!-- Controls -->
          <div class="space-y-3">
            <button
              @click="refreshUser"
              :disabled="isLoading"
              class="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center"
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{
                isLoading ? "Connecting via Action..." : "Fetch User (Action)"
              }}
            </button>

            <button
              @click="resetUser"
              :disabled="isLoading"
              class="w-full bg-white border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
            >
              Reset State
            </button>
          </div>
        </div>

        <!-- RIGHT COLUMN: Under the Hood -->
        <div class="flex flex-col">
          <h3 class="font-bold text-gray-800 mb-3 text-sm flex items-center">
            <span class="mr-2">🛠️</span> Under the Hood (Pinia):
          </h3>

          <!-- Live State Inspector -->
          <div class="bg-gray-900 rounded-xl p-5 shadow-inner mb-4 flex-grow">
            <div class="text-gray-500 text-xs mb-2 font-mono">
              // Raw Pinia Store State
            </div>
            <pre
              class="text-green-400 font-mono text-sm leading-relaxed overflow-x-auto"
            >
<code>{
  <span class="text-blue-300">"user"</span>: <span class="text-yellow-300">"{{ user }}"</span>,
  <span class="text-blue-300">"status"</span>: <span class="text-yellow-300">"{{ status }}"</span>
}</code></pre>
          </div>
        </div>
      </div>

      <!-- Explanation -->
      <div class="mt-8 pt-6 border-t border-gray-100">
        <ul class="text-xs text-gray-500 grid md:grid-cols-4 gap-4">
          <li class="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span class="block font-bold text-blue-600 mb-1">1. Action</span>
            Button calls <code>refreshUser()</code> action directly.
          </li>
          <li class="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span class="block font-bold text-blue-600 mb-1"
              >2. State Mutation</span
            >
            Inside the action we directly modify <code>this.user</code> and
            <code>this.status</code>.
          </li>
          <li class="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span class="block font-bold text-blue-600 mb-1"
              >3. Reactivity</span
            >
            Pinia + Vue’s reactivity system instantly updates the UI.
          </li>
          <li class="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span class="block font-bold text-blue-600 mb-1"
              >4. No Mutations</span
            >
            No separate mutation functions needed — very clean!
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/stores/userStore";

export default {
  name: "StatePage",
  computed: {
    ...mapState(useUserStore, ["user", "status", "isLoading"]),
  },
  methods: {
    ...mapActions(useUserStore, ["refreshUser", "resetUser"]),
  },
};
</script>
