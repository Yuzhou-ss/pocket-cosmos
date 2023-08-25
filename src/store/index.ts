import { defineStore } from "pinia"

export const useMainStore = defineStore('main', {
  state: () => {
    return {
        username:localStorage.getItem("username"),
        nickname:localStorage.getItem("nickname"),
        defaultSearch:localStorage.getItem("defaultSearch")
    }
  },
  getters: {
  },
  actions: {
    changeUserInfo(username:string | null, nickname:string | null, defaultSearch: string | null){
        this.username = username
        this.nickname = nickname
        this.defaultSearch = defaultSearch
    }
  },
})
