<template>
  <div
    :class="[
      isEmailSelected ? 'bg-gray-100 dark:bg-gray-900/40' : '',
      'grid grid-cols-[5%_25%_60%_10%] px-3 py-2 hover:shadow-lg cursor-pointer overflow-hidden text-gray-800 dark:text-gray-200',
    ]"
  >
    <div class="flex h-6 items-center mr-3">
      <input
        type="checkbox"
        v-model="isEmailSelected"
        @input="selectEmailToggled"
        class="h-4 w-4 rounded border-gray-300 dark:border-gray-900 dark:bg-gray-600 text-indigo-600 focus:ring-indigo-500"
      />
    </div>
    <div
      :class="[
        !email.is_read
          ? 'font-bold dark:text-gray-300'
          : 'text-gray-800 dark:text-gray-200',
        'whitespace-nowrap',
      ]"
    >
      {{ email.sender.label }}
    </div>
    <div class="flex gap-1 whitespace-nowrap overflow-hidden truncate">
      <div class="flex gap-2">
        <span
          v-for="label in email.labels"
          :key="label.id"
          :class="[
            getLabelColorClass(label),
            'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium',
          ]"
        >
          {{ label.name }}
        </span>
      </div>

      <p
        :class="[
          !email.is_read
            ? 'font-bold dark:text-gray-300'
            : 'text-gray-800 dark:text-gray-200',
        ]"
      >
        {{ email.subject }}
      </p>
      <p>-</p>
      <p class="whitespace-nowrap">
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
    getLabelColorClass(label) {
      switch (label.color) {
        case "black":
          return "bg-black text-white";
        case "slate":
          return "bg-slate-300 text-slate-800";
        case "gray":
          return "bg-gray-300 text-gray-800";
        case "red":
          return "bg-red-300 text-red-800";
        case "orange":
          return "bg-orange-300 text-orange-800";
        case "amber":
          return "bg-amber-300 text-amber-800";
        case "yellow":
          return "bg-yellow-300 text-yellow-800";
        case "lime":
          return "bg-lime-300 text-lime-800";
        case "green":
          return "bg-green-300 text-green-800";
        case "emerald":
          return "bg-emerald-300 text-emerald-800";
        case "teal":
          return "bg-teal-300 text-teal-800";
        case "cyan":
          return "bg-cyan-300 text-cyan-800";
        case "sky":
          return "bg-sky-300 text-sky-800";
        case "blue":
          return "bg-blue-300 text-blue-800";
        case "indigo":
          return "bg-indigo-300 text-indigo-800";
        case "violet":
          return "bg-violet-300 text-violet-800";
        case "purple":
          return "bg-purple-300 text-purple-800";
        case "fuchsia":
          return "bg-fuchsia-300 text-fuchsia-800";
        case "pink":
          return "bg-pink-300 text-pink-800";
        case "rose":
          return "bg-rose-300 text-rose-800";
        default:
          return "bg-gray-300 text-gray-800";
      }
    },
  },
  computed: {
    getBodyPreview() {
      return this.email.text_body.replace(/(\r\n|\n|\r)/gm, " ");
    },
    getTime() {
      const received = DateTime.fromFormat(
        this.email.received_at,
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
