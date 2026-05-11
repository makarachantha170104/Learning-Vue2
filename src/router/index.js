import Vue from "vue";
import VueRouter from "vue-router";
import Projects from "../views/Projects.vue"; // Using the file we just completed

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/projects",
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  // Task 12: Project Detail Route
  {
    path: "/project/:id",
    name: "project-detail",
    // Lazy loading the detail view to keep the initial bundle small
    component: () => import("../views/ProjectDetail.vue"),
    props: true, // This allows the :id to be passed as a prop directly to the component
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
