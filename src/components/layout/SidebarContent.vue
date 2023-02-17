<template>
  <div>
    <InboxSelector />

    <button
      type="button"
      class="mt-3 w-full inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base text-white shadow-sm hover:bg-indigo-800 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <EnvelopeIcon class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
      Compose email
    </button>

    <div class="mt-8">
      <!-- Secondary navigation -->
      <h3
        class="px-3 text-sm font-medium text-primary-100"
        id="desktop-teams-headline"
      >
        Labels
      </h3>
      <div
        class="mt-1 space-y-1 max-h-[64vh] overflow-y-scroll"
        role="group"
        aria-labelledby="desktop-teams-headline"
      >
        <a
          v-for="label in getLabels"
          :key="label.name"
          @click="selectLabel(label)"
          class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-primary-100 hover:bg-primary-600"
        >
          <span
            :class="[
              getLabelColorClass(label),
              'w-2.5 h-2.5 mr-4 rounded-full ',
            ]"
            aria-hidden="true"
          />
          <span class="truncate">{{ label.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import InboxSelector from "@/components/layout/InboxSelector.vue";
import { EnvelopeIcon } from "@heroicons/vue/24/solid";
import { useEmailStore } from "@/stores/models/email";
import { useLayoutStore } from "@/stores/layout";
import { mapState } from "pinia";
import { useLabelStore } from "@/stores/models/label";

export default {
  name: "SidebarContent",
  components: { InboxSelector, EnvelopeIcon },
  methods: {
    selectLabel(label) {
      useEmailStore().setLabelId(label.id);
    },
    getLabelColorClass(label) {
      switch (label.color) {
        case "black":
          return "bg-black";
        case "slate":
          return "bg-slate-600";
        case "gray":
          return "bg-gray-600";
        case "red":
          return "bg-red-600";
        case "orange":
          return "bg-orange-600";
        case "amber":
          return "bg-amber-600";
        case "yellow":
          return "bg-yellow-600";
        case "lime":
          return "bg-lime-600";
        case "green":
          return "bg-green-600";
        case "emerald":
          return "bg-emerald-600";
        case "teal":
          return "bg-teal-600";
        case "cyan":
          return "bg-cyan-600";
        case "sky":
          return "bg-sky-600";
        case "blue":
          return "bg-blue-600";
        case "indigo":
          return "bg-indigo-600";
        case "violet":
          return "bg-violet-600";
        case "purple":
          return "bg-purple-600";
        case "fuchsia":
          return "bg-fuchsia-600";
        case "pink":
          return "bg-pink-600";
        case "rose":
          return "bg-rose-600";
        default:
          return "bg-gray-600";
      }
    },
    setSideBarState(state) {
      useLayoutStore().setSidebarState(state);
    },
  },
  computed: {
    ...mapState(useLabelStore, ["getLabels"]),
  },
};
</script>

<style scoped></style>
