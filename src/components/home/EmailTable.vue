<template>
  <div v-if="isModuleLoaded">
    <TableHeader />
  </div>
</template>

<script>
import TableHeader from "@/components/home/TableHeader.vue";
import { mapState } from "pinia";
import { useEmailStore } from "@/stores/models/email";

export default {
  name: "EmailTable",
  components: { TableHeader },
  computed: {
    ...mapState(useEmailStore, ["isModuleLoaded"]),
  },
};
</script>

<style scoped></style>
