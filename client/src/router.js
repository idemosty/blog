import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/tips",
    name: "tips",
    component: () => import("./components/TipsList")
  },
  {
    path: "/tips/:id",
    name: "tip-details",
    component: () => import("./components/Tip")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTip")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;