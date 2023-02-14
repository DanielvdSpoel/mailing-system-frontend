<template>
  <div class="flex justify-between py-1 px-3">
    <!-- controls -->
    <div class="flex gap-2">
      <EmailSelectorDropdown />
      <RefreshEmailsButton />
      <EmailActions />
    </div>
    <Pagination />
  </div>
</template>

<script>
import { useEmailStore } from "@/stores/models/email";
import EmailSelectorDropdown from "@/components/home/EmailSelectorDropdown.vue";
import EmailActions from "@/components/home/EmailActions.vue";
import RefreshEmailsButton from "@/components/home/RefreshEmailsButton.vue";
import Pagination from "@/components/home/PaginationControls.vue";

export default {
  name: "TableHeader",
  components: {
    Pagination,
    RefreshEmailsButton,
    EmailActions,
    EmailSelectorDropdown,
  },
  computed: {
    store() {
      return useEmailStore();
    },
  },
};
</script>

<style scoped></style>
