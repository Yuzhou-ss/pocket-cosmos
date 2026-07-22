// src/store/modules/user.ts
import { defineStore } from "pinia";

export interface UserState {
  username: string | null;
  nickname: string | null;
  defaultSearch: string | null;
  userId: string | null;
  defaultWeather: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    username: localStorage.getItem("username"),
    nickname: localStorage.getItem("nickname"),
    defaultSearch: localStorage.getItem("defaultSearch"),
    userId: localStorage.getItem("userId"),
    defaultWeather: localStorage.getItem("defaultWeather"),
  }),

  getters: {
    isLoggedIn: (state): boolean => !!state.username,
    displayName: (state): string =>
      state.nickname || state.username || "未知用户",
  },

  actions: {
    changeUserInfo(
      username: string | null,
      nickname: string | null,
      defaultSearch: string | null,
      userId: string | null,
      defaultWeather: string | null
    ) {
      this.username = username;
      this.nickname = nickname;
      this.defaultSearch = defaultSearch;
      this.userId = userId;
      this.defaultWeather = defaultWeather;

      // 同步到 localStorage
      if (username !== null) localStorage.setItem("username", username);
      else localStorage.removeItem("username");

      if (nickname !== null) localStorage.setItem("nickname", nickname);
      else localStorage.removeItem("nickname");

      if (defaultSearch !== null)
        localStorage.setItem("defaultSearch", defaultSearch);
      else localStorage.removeItem("defaultSearch");

      if (defaultWeather !== null)
        localStorage.setItem("defaultWeather", defaultWeather);
      else localStorage.removeItem("defaultWeather");
    },

    clearUserInfo() {
      this.changeUserInfo(null, null, null, null, null);
    },
  },
});
