import { defineStore } from "pinia";

export const useErrorStore = defineStore("errors", {
  state: () => {
    return { errors: [], formErrors: null };
  },
  getters: {
    getFormError: (state) => {
      return (name) => {
        if (state.formErrors && state.formErrors[name]) {
          return state.formErrors[name][0];
        }
        return null;
      };
    },
  },
  actions: {
    addError(error) {
      this.errors.push(error);
    },
    clearErrors() {
      this.errors = [];
    },
    clearFormErrors() {
      this.formErrors = null;
    },
    setFormErrors(errors) {
      this.formErrors = errors;
    },
    addErrors(errors) {
      this.errors.push(...errors);
    },
  },
});
