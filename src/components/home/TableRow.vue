<template>
  <div class="grid grid-cols-[5%_25%_60%_10%] px-3 py-2 hover:shadow-lg cursor-pointer overflow-hidden">
    <div class="mr-3 flex h-6 items-center">
      <input
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
    </div>
    <div class="whitespace-nowrap">
      {{ email.sender.label }}
    </div>
    <div class="flex gap-1 whitespace-nowrap">
      <p>{{ email.subject }}</p>
      <p>-</p>
      <p class="overflow-hidden truncate whitespace-nowrap">{{ getBodyPreview }}</p>
    </div>
    <div class="flex justify-end whitespace-nowrap">
      <p>{{ getTime }}</p>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";

export default {
  name: "TableRow",
  components: {},
  props: {
    email: Object,
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
