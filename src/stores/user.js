import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";

export const useUserStore = defineStore("user", {
  state: () => {
    return { token: null, user: {} };
  },
  actions: {
    fetchUser(http) {
      const that = this;
      http.get("/user").then(async (response) => {
        that.user = response.data;
        await Preferences.set({
          key: "user",
          value: response.data,
        });
      });
    },
    setUser(user) {
      this.user = user;
    },
    async setToken(token) {
      this.token = token;
      await Preferences.set({
        key: "token",
        value: token,
      });
    },
  },
  getters: {
    isAuthenticated() {
      return !!this.token;
    },
  },
});
