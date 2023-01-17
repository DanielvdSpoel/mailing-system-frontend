import {defineStore} from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {token: null, user: {}};
  },
  actions: {
    fetchUser(http) {
      const that = this;
      http.get("/user").then((response) => {
        that.user = response.data;
      });
    },
    setToken(token) {
      this.token = token;
    },
  },
  getters: {
    isAuthenticated() {
      return !!this.token;
    }
  }
});
