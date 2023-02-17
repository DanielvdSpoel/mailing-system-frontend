import { defineStore } from "pinia";
import http from "@/composables/http";
import { useInboxStore } from "@/stores/models/inbox";

export const useEmailStore = defineStore("emails", {
  state: () => {
    return {
      emails: null,
      meta: null,
      urls: null,
      amountPerPage: 25,
      currentPage: 1,
      inboxId: null,
      labelId: null,
      senderId: null,
      search: "",
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
      if (state.inboxId) {
        return useInboxStore().getInboxById(state.inboxId);
      }
      return {
        id: null,
        name: "Global inbox",
        senderAddresses: ["All inboxes"],
      };
    },
    getEmailById: (state) => {
      return (emailId) => state.emails.find((email) => email.id === emailId);
    },
  },
  actions: {
    setSearch(search) {
      this.search = search;
      this.currentPage = 1;
      this.fetchEmails();
    },
    setLabelId(label) {
      this.labelId = label;
      this.currentPage = 1;
      this.fetchEmails();
    },
    setSenderId(sender) {
      this.senderId = sender;
      this.currentPage = 1;
      this.fetchEmails();
    },
    setPage(page) {
      console.log("setPage", page);
      this.currentPage = page;
      this.fetchEmails();
    },
    setAmountPerPage(amount) {
      this.currentPage = 1;
      this.amountPerPage = amount;
      this.fetchEmails();
    },
    selectInbox(inbox) {
      this.inboxId = inbox;
    },
    fetchEmails() {
      const params = {
        per_page: this.amountPerPage,
        page: this.currentPage,
      };
      if (this.selectedInbox) {
        params.inbox_id = this.selectedInbox.id;
      }

      if (this.search) {
        params.search = this.search;
      }

      if (this.labelId) {
        params.label_id = this.labelId;
      }

      if (this.senderId) {
        params.sender_id = this.senderId;
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
