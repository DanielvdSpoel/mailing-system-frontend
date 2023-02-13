<template>
  <div
    class="grid grid-cols-[5%_25%_60%_10%] px-3 py-2 hover:shadow-lg cursor-pointer overflow-hidden text-gray-800 dark:text-gray-200"
  >
    <div class="flex h-6 items-center mr-3">
      <input
        type="checkbox"
        v-model="isEmailSelected"
        @input="selectEmailToggled"
        class="h-4 w-4 rounded border-gray-300 dark:border-gray-900 dark:bg-gray-600 text-indigo-600 focus:ring-indigo-500"
      />
    </div>
    <div class="whitespace-nowrap">
      {{ email.sender.label }}
    </div>
    <div class="flex gap-1 whitespace-nowrap">
      <p>{{ email.subject }}</p>
      <p>-</p>
      <p class="whitespace-nowrap overflow-hidden truncate">
        {{ getBodyPreview }}
      </p>
    </div>
    <div class="whitespace-nowrap flex justify-end">
      <p>{{ getTime }}</p>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import { useSelectedEmailStore } from "@/stores/selectedEmails";

export default {
  name: "TableRow",
  components: {},
  props: {
    email: Object,
  },
  data() {
    return {
      isEmailSelected: false,
    };
  },
  mounted() {
    useSelectedEmailStore().$subscribe((mutation, state) => {
      this.isEmailSelected = state.selectedEmails.includes(this.email.id);
    });
  },
  methods: {
    selectEmailToggled() {
      //Boolean is flipped here
      if (!this.isEmailSelected) {
        console.log("selecting email");
        useSelectedEmailStore().selectEmail(this.email);
      } else {
        console.log("deselecting email");
        useSelectedEmailStore().deselectEmail(this.email);
      }
    },
  },
  computed: {
    getBodyPreview() {
      return this.email.text_body.replace(/(\r\n|\n|\r)/gm, " ");
    },
    getTime() {
      const received = DateTime.fromFormat(
        this.email.recieved_at,
        "yyyy-MM-dd HH:mm:ss"
      );
      const now = DateTime.now();
      if (received.hasSame(now, "day")) {
        return received.toFormat("HH:mm");
      }
      if (received.hasSame(now, "year")) {
        return received.toFormat("d LLL.");
      }
      return received.toFormat("dd-MM-yyyy");
    },
  },
};
</script>

<style scoped></style>
