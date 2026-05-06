<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-6">Lifecycle Hooks</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center space-x-4 mb-6">
        <div :class="statusColor" class="w-4 h-4 rounded-full"></div>
        <span class="text-lg font-medium">{{ statusText }}</span>
      </div>

      <div class="bg-gray-800 text-green-400 p-4 rounded-md font-mono text-sm">
        <ul>
          <li v-for="(log, index) in logs" :key="index">> {{ log }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logs: [],
      statusText: "Initializing...",
      statusColor: "bg-yellow-400",
    };
  },
  created() {
    this.addLog("Hook: created - Data is reactive, but DOM not yet rendered.");
  },
  mounted() {
    this.statusText = "Component Mounted!";
    this.statusColor = "bg-green-500";
    this.addLog("Hook: mounted - The component is now in the DOM.");
  },
  methods: {
    addLog(msg) {
      this.logs.push(`${new Date().toLocaleTimeString()}: ${msg}`);
    },
  },
};
</script>
