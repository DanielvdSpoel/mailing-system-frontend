import { defineStore } from "pinia";
import http from "@/composables/http";

export const useLabelStore = defineStore("labels", {
  state: () => {
    return { labels: [], synced: false };
  },
  getters: {
    getLabels(state) {
      if (state.labels.length > 0) {
        return state.labels;
      }
      if (!state.synced) {
        useLabelStore().fetchLabels();
      }
      return state.labels;
    },
  },
  actions: {
    fetchLabels() {
      http
        .get("/labels")
        .then((response) => {
          this.synced = true;
          this.labels = response.data.data;
        })
        .catch((error) => {
          this.synced = true;
          console.log(error);
        });
    },
  },
});
