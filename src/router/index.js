import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import RouterPage from "../views/RouterPage.vue"; // Import the new RouterPage component

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/router", name: "Router", component: RouterPage },
  {
    path: "/components",
    name: "Components",
    component: () => import("../views/ComponentsPage.vue"),
  },
  {
    path: "/props",
    name: "Props",
    component: () => import("../views/PropsPage.vue"),
  },
  {
    path: "/events",
    name: "Events",
    component: () => import("../views/EventsPage.vue"),
  },
  {
    path: "/lifecycle",
    name: "Lifecycle",
    component: () => import("../views/LifecyclePage.vue"),
  },
  {
    path: "/state",
    name: "State",
    component: () => import("../views/StatePage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
