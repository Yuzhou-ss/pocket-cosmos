import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/home/index.vue"),
    },
  ],
});

export default router