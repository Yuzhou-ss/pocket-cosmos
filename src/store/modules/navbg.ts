import { defineStore } from "pinia";

export interface NavBgStore {
  currrentBg: string;
}

// 定义本地存储键名
const STORAGE_KEY = "navigation-bg";

export const useNavBgStore = defineStore("navBg", {
  state: (): NavBgStore => ({
    currrentBg: localStorage.getItem(STORAGE_KEY) || "",
  }),

  getters: {
    currentBgSrc: (state) => {
      return state.currrentBg;
    },
  },

  actions: {
    setCurrentBg(bg: string) {
      this.currrentBg = bg;
      // 同步更新到 localStorage
      localStorage.setItem(STORAGE_KEY, bg);
    },
  },
});
