<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 z-[20] flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <NotificationCard
        v-for="notification in notifications"
        :key="notification"
        :notification="notification"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useNotificationStore } from "@/stores/notifications";
import NotificationCard from "@/components/notifications/NotificationCard.vue";

export default {
  name: "NotificationsView",
  components: {
    NotificationCard,
  },
  computed: {
    ...mapState(useNotificationStore, ["notifications"]),
  },
};
</script>

<style scoped></style>
