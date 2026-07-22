// src/store/modules/search.ts
import { defineStore } from "pinia";

export interface SearchState {
  currentEngine: string;
  searchHistory: string[];
  maxHistoryItems: number;
}

// 定义本地存储键名
const STORAGE_KEY = 'terminal_search_engine';

export const useSearchStore = defineStore("search", {
  state: (): SearchState => ({
    // 从 localStorage 初始化 currentEngine，如果没有则默认为 "BAIDU"
    currentEngine: localStorage.getItem(STORAGE_KEY) || "BAIDU",
    searchHistory: [],
    maxHistoryItems: 10,
  }),

  getters: {
    searchEngines: () => [
      {
        key: "BAIDU",
        name: "百度",
        icon: "baidu",
        url: "https://www.baidu.com/s?wd=",
      },
      {
        key: "GOOGLE",
        name: "谷歌",
        icon: "google",
        url: "https://www.google.com/search?q=",
      },
      {
        key: "BING",
        name: "必应",
        icon: "bing",
        url: "https://cn.bing.com/search?q=",
      },
      {
        key: "CSDN",
        name: "CSDN",
        icon: "csdn",
        url: "https://so.csdn.net/so/search?spm=1000.2115.3001.4498&q=",
      },
      {
        key: "BILIBILI",
        name: "哔哩哔哩",
        icon: "bilibili",
        url: "https://www.bilibili.com/search?keyword=",
      },
    ],

    currentSearchInfo: (state) => {
      const searchStore = useSearchStore();
      return (
        searchStore.searchEngines.find(
          (engine) => engine.key === state.currentEngine
        ) || searchStore.searchEngines[0]
      );
    },
  },

  actions: {
    setCurrentEngine(engineKey: string) {
      this.currentEngine = engineKey;
      // 同步更新到 localStorage
      localStorage.setItem(STORAGE_KEY, engineKey);
    },

    addSearchHistory(keyword: string) {
      if (!keyword.trim()) return;

      // 移除重复项
      this.searchHistory = this.searchHistory.filter(
        (item) => item !== keyword
      );
      // 添加到开头
      this.searchHistory.unshift(keyword);
      // 限制数量
      if (this.searchHistory.length > this.maxHistoryItems) {
        this.searchHistory = this.searchHistory.slice(0, this.maxHistoryItems);
      }
    },

    clearSearchHistory() {
      this.searchHistory = [];
    },
  },
});