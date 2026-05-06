import { createPinia } from "pinia";
import { useUserStore } from "./userStore";

// Create Pinia instance (optional if done in main.js)
const pinia = createPinia();

export default pinia;

// Optional: Export all stores for easy access
export { useUserStore };
