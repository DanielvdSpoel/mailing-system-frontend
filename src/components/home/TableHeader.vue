<template>
  <div class="flex justify-between py-1 px-3">
    <!-- controls -->
    <div class="flex gap-2">
      <EmailSelectorDropdown />
      <div
        class="inline-flex items-center rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
      >
        <ArrowPathIcon class="h-5 w-5" aria-hidden="true" />
      </div>
      <EmailActions />
    </div>
    <!-- pagination -->
    <div class="flex gap-2">
      <div
        class="flex cursor-pointer rounded-md px-2 py-1 text-sm text-gray-400 hover:bg-gray-100"
      >
        <p>
          {{ store.meta.from }}-{{ store.meta.to }} of {{ store.meta.total }}
        </p>
      </div>
      <div
        class="inline-flex items-center rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
      >
        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
      </div>
      <div
        class="inline-flex items-center rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
      >
        <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>

<script>
import { useEmailStore } from "@/stores/models/email";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
} from "@heroicons/vue/20/solid";
import EmailSelectorDropdown from "@/components/home/EmailSelectorDropdown.vue";
import EmailActions from "@/components/home/EmailActions.vue";

export default {
  name: "TableHeader",
  components: {
    EmailActions,
    EmailSelectorDropdown,
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowPathIcon,
  },
  computed: {
    store() {
      return useEmailStore();
    },
  },
};
</script>

<style scoped></style>
