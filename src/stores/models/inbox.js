import { defineStore } from "pinia";
import http from "@/composables/http";

export const useInboxStore = defineStore("inboxes", {
  state: () => {
    return { inboxes: [] };
  },
  getters: {
    getInboxById: (state) => {
      return (inboxId) => state.inboxes.find((inbox) => inbox.id === inboxId);
    },
    getInboxes(state) {
      if (state.inboxes.length > 0) {
        return state.inboxes;
      }
      useInboxStore().fetchInboxes();
      return state.inboxes;
    },
  },
  actions: {
    fetchInboxes() {
      http
        .get("/inboxes")
        .then((response) => {
          this.inboxes = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
