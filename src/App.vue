<script setup>
import { RouterView } from "vue-router";
import NotificationsView from "@/components/notifications/Notifications.vue";
</script>

<template>
  <div>
    <RouterView />
    <NotificationsView />
  </div>
</template>
