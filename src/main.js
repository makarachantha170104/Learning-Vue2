import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import "./assets/tailwind.css";

// 1. YOU MUST IMPORT THE PLUGIN HERE
import { PiniaVuePlugin } from "pinia";

Vue.config.productionTip = false;

// 2. INSTALL THE PLUGIN
Vue.use(PiniaVuePlugin);

new Vue({
  router,
  // 3. ATTACH THE PINIA INSTANCE
  pinia,
  render: (h) => h(App),
}).$mount("#app");
