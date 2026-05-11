import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia, PiniaVuePlugin } from "pinia"; // Import the plugin
import "./assets/tailwind.css"; // Import Tailwind CSS

Vue.use(PiniaVuePlugin); // You MUST add this line for Vue 2
const pinia = createPinia();

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
