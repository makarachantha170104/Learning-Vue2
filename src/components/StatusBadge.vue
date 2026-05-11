<template>
  <span
    class="px-3 py-1 text-xs font-medium rounded-full capitalize"
    :class="statusClasses"
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
    },
  },
  computed: {
    statusClasses() {
      switch (this.status) {
        case "Todo":
          return "bg-gray-100 text-gray-700";
        case "In Progress":
          return "bg-blue-100 text-blue-700";
        case "Blocked":
          return "bg-red-100 text-red-700";
        case "Completed":
          return "bg-emerald-100 text-emerald-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    },
  },
};
</script>
