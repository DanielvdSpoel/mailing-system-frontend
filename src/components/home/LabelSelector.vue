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
        v-slot="{ close }"
        class="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="p-2">
          <label
            for="label-search"
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {{ label }}
          </label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="search"
              id="label-search"
              v-model="search"
              class="block z-20 w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-900"
            />
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <MagnifyingGlassIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
          <div class="divide-y divide-gray-100 gap-4 dark:divide-gray-700 mt-2">
            <div class="max-h-52 overflow-y-scroll">
              <LabelSelectorRow
                v-for="label in labels"
                :key="label.id"
                :closePanel="close"
                :label="label"
              />
            </div>
            <div>
              <div>
                <a
                  class="block px-4 py-2 text-sm cursor-pointer rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-gray-900 hover:dark:text-gray-100"
                >
                  Create new label
                </a>
              </div>
              <div>
                <a
                  @click="submit"
                  class="block px-4 py-2 text-sm cursor-pointer rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-gray-900 hover:dark:text-gray-100"
                >
                  Submit
                </a>
              </div>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import { useLabelStore } from "@/stores/models/label";
import LabelSelectorRow from "@/components/home/LabelSelectorRow.vue";

export default {
  name: "LabelSelector",
  props: {
    label: String,
    title: String,
  },
  components: {
    LabelSelectorRow,
    PopoverPanel,
    PopoverButton,
    Popover,
    MagnifyingGlassIcon,
  },
  data() {
    return {
      search: "",
      selectedLabels: {},
    };
  },
  methods: {
    toggleLabel(label) {
      console.log("toggled");
    },
    submit() {
      console.log("submitted");
      // console.log(Object.keys(this.selectedLabels));
    },
  },
  computed: {
    labels() {
      return useLabelStore().getLabels.filter((label) => {
        return label.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped></style>
