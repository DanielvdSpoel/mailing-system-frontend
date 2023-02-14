<template>
  <button
    @click="refresh"
    :class="[
      loading ? 'animate-spin' : '',
      'inline-flex items-center text-gray-400 rounded-full dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5',
    ]"
  >
    <ArrowPathIcon class="h-5 w-5" aria-hidden="true" />
  </button>
</template>

<script>
import { ArrowPathIcon } from "@heroicons/vue/20/solid";
import { useEmailStore } from "@/stores/models/email";

export default {
  name: "RefreshEmailsButton",
  components: {
    ArrowPathIcon,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    refresh() {
      this.loading = true;
      const data = {};
      if (useEmailStore().getSelectedInbox.id !== null) {
        data.inbox_id = useEmailStore().getSelectedInbox.id;
      }

      this.$http
        .post("/refresh", data)
        .then(async () => {
          useEmailStore().fetchEmails();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped></style>
