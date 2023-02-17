<template>
  <div>
    <div class="flex gap-2 py-1 px-3">
      <FilterButton
        v-if="selectedLabel"
        @dismiss="store.setLabelId(null)"
        :label="'Remove label filter ' + selectedLabel.name"
        :text="'Has label ' + selectedLabel.name"
      />
      <FilterButton
        v-if="selectedInbox"
        @dismiss="store.selectInbox(null)"
        :label="'Remove inbox filter ' + selectedInbox.name"
        :text="'In inbox ' + selectedInbox.name"
      />
      <FilterButton
        v-if="selectedSender"
        @dismiss="store.setSenderId(null)"
        :label="'Remove sender filter ' + selectedSender.label"
        :text="'From ' + selectedSender.label"
      />
    </div>

    <div class="flex justify-between py-1 px-3">
      <!-- controls -->
      <div class="flex gap-2">
        <EmailSelectorDropdown />
        <RefreshEmailsButton />
        <EmailActions />
      </div>
      <Pagination />
    </div>
  </div>
</template>

<script>
import { useEmailStore } from "@/stores/models/email";
import EmailSelectorDropdown from "@/components/home/EmailSelectorDropdown.vue";
import EmailActions from "@/components/home/EmailActions.vue";
import RefreshEmailsButton from "@/components/home/RefreshEmailsButton.vue";
import Pagination from "@/components/home/PaginationControls.vue";
import FilterButton from "@/components/home/FilterButton.vue";
import { useLabelStore } from "@/stores/models/label";
import { useInboxStore } from "@/stores/models/inbox";
import { useEmailAddressStore } from "@/stores/models/emailAddresses";

export default {
  name: "TableHeader",
  components: {
    FilterButton,
    Pagination,
    RefreshEmailsButton,
    EmailActions,
    EmailSelectorDropdown,
  },
  computed: {
    store() {
      return useEmailStore();
    },
    selectedLabel() {
      return useLabelStore().getLabelById(this.store.labelId);
    },
    selectedInbox() {
      return useInboxStore().getInboxById(this.store.inboxId);
    },
    selectedSender() {
      return useEmailAddressStore().getEmailAddressById(this.store.senderId);
    },
  },
};
</script>

<style scoped></style>
