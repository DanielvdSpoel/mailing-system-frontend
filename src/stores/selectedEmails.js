import { defineStore } from "pinia";
import { useEmailStore } from "@/stores/models/email";

export const useSelectedEmailStore = defineStore("selectedEmails", {
  state: () => {
    return {
      selectedEmails: [],
    };
  },
  getters: {},
  actions: {
    selectEmailUsingOption(option) {
      const temp = [];
      useEmailStore().emails.forEach((email) => {
        if (option.shouldFilter(email)) {
          temp.push(email.id);
        }
      });
      this.$patch({
        selectedEmails: temp,
      });
    },
    selectEmail(email) {
      this.$patch((state) => {
        state.selectedEmails = state.selectedEmails.filter(
          (selected) => selected !== email.id
        );
        state.selectedEmails.push(email.id);
      });
    },
    deselectEmail(email) {
      this.$patch((state) => {
        state.selectedEmails = state.selectedEmails.filter(
          (selected) => selected !== email.id
        );
      });
    },
    selectAllEmails() {
      const temp = [];
      useEmailStore().emails.forEach((email) => {
        temp.push(email.id);
      });

      this.$patch({
        selectedEmails: temp,
      });
    },
    deselectAllEmails() {
      this.$patch({
        selectedEmails: [],
      });
    },
  },
});
