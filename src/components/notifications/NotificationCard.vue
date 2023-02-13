<template>
  <transition
    enter-active-class="transform transition duration-300 ease-out"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition duration-100 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="shouldShow"
      class="pointer-events-auto z-[20] w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-700"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <CheckCircleIcon
              v-if="notification.type == 'success'"
              class="text-success-400 h-6 w-6"
              aria-hidden="true"
            />
            <XCircleIcon
              v-if="notification.type == 'danger'"
              class="text-danger-400 h-6 w-6"
              aria-hidden="true"
            />
            <ExclamationCircleIcon
              v-if="notification.type == 'warning'"
              class="text-warning-400 h-6 w-6"
              aria-hidden="true"
            />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-200">
              {{ notification.message }}
            </p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-50">
              {{ notification.description }}
            </p>
          </div>
          <div class="ml-4 flex flex-shrink-0">
            <button
              type="button"
              @click="shouldShow = false"
              class="focus:ring-primary-500 inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-gray-700"
            >
              <span class="sr-only">Close</span>
              <XMarkIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import notifications from "./Notifications.vue";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { XCircleIcon } from "@heroicons/vue/24/outline";
import { XMarkIcon } from "@heroicons/vue/20/solid";
import { ExclamationCircleIcon } from "@heroicons/vue/20/solid";

export default {
  name: "NotificationCard",
  computed: {
    notifications() {
      return notifications;
    },
  },
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      shouldShow: true,
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.shouldShow = false;
    // }, this.notification.duration);
  },
  components: {
    CheckCircleIcon,
    XMarkIcon,
    XCircleIcon,
    ExclamationCircleIcon,
  },
};
</script>

<style scoped></style>
