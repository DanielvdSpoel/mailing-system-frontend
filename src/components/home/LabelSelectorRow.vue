<template>
  <div
    @click="toggleLabel"
    class="flex w-full gap-2 px-4 py-2 cursor-pointer rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-gray-900 hover:dark:text-gray-100"
  >
    <input
      @click="checkboxClicked"
      type="checkbox"
      class="h-4 w-4 mt-1 rounded border-gray-300 dark:border-gray-900 dark:bg-gray-600 text-indigo-600 focus:ring-indigo-500"
    />
    <a class="block text-sm">
      {{ label.name }}
    </a>
  </div>
</template>

<script>
import { useSelectedEmailStore } from "@/stores/selectedEmails";
import { useEmailStore } from "@/stores/models/email";

export default {
  name: "LabelSelectorRow",
  props: {
    label: Object,
    closePanel: Function,
  },
  data() {
    return {
      checkboxClick: false,
    };
  },
  methods: {
    checkboxClicked() {
      this.checkboxClick = true;
    },
    toggleLabel() {
      if (!this.checkboxClick) {
        console.log("toggle label");

        const ids = useSelectedEmailStore().getSelectedIds;
        const data = {
          labels: [this.label.id],
        };
        this.$http
          .patch("/emails/batch-update", { ids, data })
          .then((response) => {
            useSelectedEmailStore().deselectAllEmails();
            useEmailStore().fetchEmails();
          });
        this.closePanel();
      }
      this.checkboxClick = false;
    },
  },
};
</script>

<style scoped></style>
