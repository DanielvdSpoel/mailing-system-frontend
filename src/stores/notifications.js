import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notifications", {
  state: () => {
    return { notifications: [] };
  },
  actions: {
    addNotification(notification) {
      this.notifications.push(notification);
    },
    clearNotifications() {
      this.notifications = [];
    },
  },
});
