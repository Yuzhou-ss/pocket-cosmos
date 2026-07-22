import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_UR),
  routes: [
    {
      path: "/",
      redirect: "/yuzhou/navigation",
    },
    {
      path: "/yuzhou/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/yuzhou/terminal",
      name: "terminal",
      component: () => import("@/views/terminal/index.vue"),
    },
    {
      path: "/yuzhou/home",
      name: "home",
      component: () => import("@/views/home/index.vue"),
    },
    {
      path: "/yuzhou/about",
      name: "about",
      component: () => import("@/views/about/index.vue"),
    },
    {
      path: "/yuzhou/navigation",
      name: "navigation",
      component: () => import("@/views/navigation/index.vue"),
    },
    {
      path: "/yuzhou/productRoadmap",
      name: "productRoadmap",
      component: () => import("@/views/productRoadmap.vue"),
    },
    {
      path: "/yuzhou/windowTerminal",
      name: "productRoadmap",
      component: () => import("@/views/windowsTerminal/index.vue"),
    },
    {
      path: "/yuzhou/404",
      name: "404",
      component: () => import("@/views/404.vue"),
    },
    
  ],
});

export default router;
