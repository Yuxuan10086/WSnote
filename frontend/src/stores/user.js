import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: '',
    token: '',
    isLoggedIn: false,
  }),
  actions: {
    login(userInfo) {
      this.userName = userInfo.userName
      this.token = userInfo.token
      this.isLoggedIn = true
    },
    logout() {
      this.userName = ''
      this.token = ''
      this.isLoggedIn = false
    },
  },
  persist: true, // 自动存储
})
