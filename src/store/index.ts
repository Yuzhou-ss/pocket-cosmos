// src/store/index.ts
import { createPinia } from "pinia";
import type { App } from "vue";

const pinia = createPinia();

export const setupStore = (app: App) => {
  app.use(pinia);
};

export { useUserStore } from "./modules/user";
export { useSearchStore } from "./modules/search";
export { useNavBgStore } from "./modules/navbg";
