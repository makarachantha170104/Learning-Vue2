import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";

// Pinia
import { createPinia } from "pinia";

Vue.config.productionTip = false;

const pinia = createPinia();

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
