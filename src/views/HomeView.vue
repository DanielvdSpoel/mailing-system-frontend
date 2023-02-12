<template>
  <MainLayout>
    <template #content>
      <div class="bg-white dark:bg-gray-800 h-[84vh] rounded-lg p-2">
        <EmailTable />
      </div>
    </template>
  </MainLayout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import { useEmailStore } from "@/stores/models/email";
import EmailTable from "@/components/home/EmailTable.vue";

export default {
  name: "HomeView",
  components: { EmailTable, MainLayout },
  mounted() {
    useEmailStore().fetchEmails();
  },
};
</script>
