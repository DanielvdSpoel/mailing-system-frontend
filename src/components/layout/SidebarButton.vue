<template>
  <button
    type="button"
    class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:border-gray-600 dark:text-gray-400 md:hidden"
    @click="setSideBarState(true)"
  >
    <span class="sr-only">Open sidebar</span>
    <Bars3BottomLeftIcon class="h-6 w-6" aria-hidden="true" />
  </button>
</template>

<script>
import { Bars3BottomLeftIcon } from "@heroicons/vue/24/outline";
import { useLayoutStore } from "@/stores/layout";

export default {
  name: "SidebarButton",
  components: {
    Bars3BottomLeftIcon,
  },
  methods: {
    setSideBarState(state) {
      useLayoutStore().setSidebarState(state);
    },
  },
};
</script>

<style scoped></style>
