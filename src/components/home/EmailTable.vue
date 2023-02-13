<template>
  <div v-if="isModuleLoaded">
    <TableHeader />
    <div class="divide-y divide-gray-200 dark:divide-gray-700">
      <TableRow v-for="email in getEmails" :key="email.id" :email="email" />
    </div>
  </div>
</template>

<script>
import TableHeader from "@/components/home/TableHeader.vue";
import { mapState } from "pinia";
import { useEmailStore } from "@/stores/models/email";
import TableRow from "@/components/home/TableRow.vue";

export default {
  name: "EmailTable",
  components: { TableRow, TableHeader },
  computed: {
    ...mapState(useEmailStore, ["isModuleLoaded"]),
    ...mapState(useEmailStore, ["getEmails"]),
  },
};
</script>

<style scoped></style>
