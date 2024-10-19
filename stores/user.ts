import { defineStore } from 'pinia'

interface User {
  id: number
  email: string
  // Add other user properties as needed
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null as string | null,
    user: null as User | null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUser(user: User) {
      this.user = user
    },
    logout() {
      this.token = null
      this.user = null
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
})