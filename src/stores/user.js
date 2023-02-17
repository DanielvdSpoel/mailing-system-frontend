import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";
import http from "@/composables/http";

export const useUserStore = defineStore("user", {
  state: () => {
    return { token: null, user: {} };
  },
  actions: {
    fetchUser() {
      const that = this;
      http.get("/user").then(async (response) => {
        console.log("response", response);
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
    getUser(state) {
      if (state.user == {}) {
        useUserStore().fetchUser();
        return {};
      }
      return state.user;
    },
    isAuthenticated() {
      return !!this.token;
    },
  },
});
