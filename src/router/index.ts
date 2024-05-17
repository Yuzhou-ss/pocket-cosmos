import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/terminal",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/terminal",
      name: "terminal",
      component: () => import("@/views/terminal/index.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/home/index.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/about/index.vue"),
    },
    {
      path: "/ppt",
      name: "ppt",
      component: () => import("@/views/ppt/index.vue"),
    },
  ],
});

export default router;
