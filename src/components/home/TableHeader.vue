<template>
  <div class="flex justify-between py-1 px-3">
    <!-- controls -->
    <div class="flex gap-2">
      <EmailSelectorDropdown />
      <RefreshEmailsButton />
      <EmailActions />
    </div>
    <!-- pagination -->
    <div class="flex gap-2">
      <div
        class="cursor-pointer text-gray-400 dark:text-gray-500 text-sm flex hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md cursor-pointer"
      >
        <p>
          {{ store.meta.from }}-{{ store.meta.to }} of {{ store.meta.total }}
        </p>
      </div>
      <div
        class="inline-flex items-center text-gray-400 dark:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5"
      >
        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
      </div>
      <div
        class="inline-flex items-center text-gray-400 dark:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5"
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
import RefreshEmailsButton from "@/components/home/RefreshEmailsButton.vue";

export default {
  name: "TableHeader",
  components: {
    RefreshEmailsButton,
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
