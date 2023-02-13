<template>
  <button
    @click="refresh"
    class="inline-flex items-center text-gray-400 rounded-full dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5"
  >
    <ArrowPathIcon class="h-5 w-5" aria-hidden="true" />
  </button>
</template>

<script>
import { ArrowPathIcon } from "@heroicons/vue/20/solid";

export default {
  name: "RefreshEmailsButton",
  components: {
    ArrowPathIcon,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    refresh() {
      this.loading = true;
    },
  },
};
</script>

<style scoped></style>
