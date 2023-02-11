import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", {
  state: () => {
    return { isSidebarOpened: false };
  },
  actions: {
    setSidebarState(state) {
      this.isSidebarOpened = state;
    },
  },
  getters: {
    getSidebarState: (state) => state.isSidebarOpened,
  },
});
