<template>
  <Popover class="relative inline-block text-left">
    <div>
      <PopoverButton>
        <div
          class="inline-flex items-center text-gray-400 rounded-full dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5"
          v-tooltip="title"
        >
          <slot name="icon"></slot>
        </div>
      </PopoverButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <PopoverPanel
        unmount
        v-slot="{ close }"
        class="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <LabelSelectorContent :close="close" :label="label" />
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import LabelSelectorContent from "@/components/home/labelSelector/LabelSelectorContent.vue";

export default {
  name: "LabelSelector",
  props: {
    label: String,
    title: String,
  },
  components: {
    LabelSelectorContent,
    PopoverPanel,
    PopoverButton,
    Popover,
  },
  data() {
    return {
      search: "",
      selectedLabels: {},
    };
  },
};
</script>

<style scoped></style>
