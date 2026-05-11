import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/projects",
  },
  {
    path: "/projects",
    name: "Projects",
    component: () => import("../views/Projects.vue"), // We'll create this later
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
