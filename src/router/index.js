import Vue from "vue";
import VueRouter from "vue-router";
import ProjectList from "../views/ProjectList.vue"; // Updated import name

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/projects",
  },
  {
    path: "/projects",
    name: "ProjectList",
    component: ProjectList,
  },
  {
    path: "/project/:id/detail", // Exactly as per your Mini Project spec
    name: "project-detail",
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
