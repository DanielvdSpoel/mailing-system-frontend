import { defineStore } from "pinia";
import http from "@/composables/http";

export const useEmailStore = defineStore("emails", {
  state: () => {
    return {
      emails: null,
      selectedInbox: null,
      meta: null,
      urls: null,
    };
  },
  getters: {
    isModuleLoaded(state) {
      return state.meta !== null && state.urls !== null;
    },
    getEmails(state) {
      if (state.emails.length > 0) {
        return state.emails;
      }
      if (!state.emails == null) {
        useEmailStore().fetchEmails();
      }
      return state.emails;
    },
    getSelectedInbox(state) {
      if (state.selectedInbox) {
        return state.selectedInbox;
      }
      return {
        id: null,
        name: "Global inbox",
        senderAddresses: ["All inboxes"],
      };
    },
  },
  actions: {
    selectInbox(inbox) {
      this.selectedInbox = inbox;
    },
    fetchEmails() {
      const params = {};
      if (this.selectedInbox) {
        params.inbox_id = this.selectedInbox.id;
      }

      http
        .get("/emails", {
          params: params,
        })
        .then((response) => {
          console.log(response.data);
          this.emails = response.data.data;
          this.meta = response.data.meta;
          this.urls = response.data.links;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
