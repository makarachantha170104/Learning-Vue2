<template>
  <span
    :class="statusClasses"
    class="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 whitespace-nowrap"
  >
    {{ status }}
  </span>
</template>

<script>
export default {
  name: "StatusBadge",
  props: {
    status: {
      type: String,
      required: true,
      default: "Todo",
    },
  },
  computed: {
    statusClasses() {
      const maps = {
        Todo: "bg-gray-50 text-gray-500 border-gray-100",
        "In Progress": "bg-blue-50 text-blue-600 border-blue-100",
        Completed: "bg-green-50 text-green-600 border-green-100",
        Blocked: "bg-red-50 text-red-600 border-red-100",
      };
      return maps[this.status] || maps["Todo"];
    },
  },
};
</script>
