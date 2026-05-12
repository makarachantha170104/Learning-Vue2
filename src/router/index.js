import Vue from "vue";
import VueRouter from "vue-router";
import Project from "../views/Project.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/projects",
  },
  {
    path: "/projects",
    name: "Project",
    component: Project,
  },
  {
    path: "/project/:id/detail", // Exactly as per your Mini Project spec
    name: "ProjectDetail",
    component: () => import("../views/ProjectDetail.vue"),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
