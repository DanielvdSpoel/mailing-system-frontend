import {defineStore} from "pinia";
import http from "@/composables/http";

export const useEmailAddressStore = defineStore("emailAddresses", {
  state: () => {
    return { emailAddresses: [], synced: false };
  },
  getters: {
    getEmailAddressById: (state) => {
      if (!state.synced) {
        useEmailAddressStore().fetchEmailAddresses();
      }
      return (addressId) =>
        state.emailAddresses.find(
          (emailAddress) => emailAddress.id === addressId
        );
    },
    getEmailAddresses(state) {
      if (state.emailAddresses.length > 0) {
        return state.emailAddresses;
      }
      if (!state.synced) {
        useEmailAddressStore().fetchEmailAddresses();
      }
      return state.emailAddresses;
    },
  },
  actions: {
    fetchEmailAddresses() {
      http
        .get("/email-addresses")
        .then((response) => {
          this.emailAddresses = response.data.data;
        })
        .finally(() => {
          this.synced = true;
        });
    },
  },
});
