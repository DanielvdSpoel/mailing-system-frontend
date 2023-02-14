import { defineStore } from "pinia";
import http from "@/composables/http";

export const useEmailStore = defineStore("emails", {
  state: () => {
    return {
      emails: null,
      selectedInbox: null,
      meta: null,
      urls: null,
      amountPerPage: 25,
      currentPage: 1,
    };
  },
  getters: {
    isModuleLoaded(state) {
      return state.meta !== null && state.urls !== null;
    },
    getEmails(state) {
      if (state.emails == null) {
        useEmailStore().fetchEmails();
        return [];
      }
      if (state.emails.length > 0) {
        return state.emails;
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
    setPage(page) {
      console.log("setPage", page)
      this.currentPage = page;
      this.fetchEmails();
    },
    setAmountPerPage(amount) {
      this.currentPage = 1;
      this.amountPerPage = amount;
      this.fetchEmails();
    },
    selectInbox(inbox) {
      this.selectedInbox = inbox;
    },
    fetchEmails() {
      const params = {
        per_page: this.amountPerPage,
        page: this.currentPage,
      };
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
