<template>
  <Menu as="div" class="text-left">
    <div>
      <MenuButton
        class="group w-full rounded-md px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-primary-600"
      >
        <span class="flex w-full items-center justify-between">
          <span class="flex min-w-0 items-center justify-between space-x-3">
            <InboxIcon class="h-5 w-5 text-primary-300" />
            <span class="flex min-w-0 flex-1 flex-col">
              <span class="truncate text-sm font-medium text-white">
                IT email
              </span>
              <span class="truncate text-sm text-primary-100">
                contact@danielvdspoel.nl
              </span>
            </span>
          </span>
          <ChevronUpDownIcon
            class="h-5 w-5 flex-shrink-0 text-white group-hover:text-primary-200"
            aria-hidden="true"
          />
        </span>
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-for="inbox in getInboxes" :key="inbox.id" as="div" v-slot="{ active }">
            <span
              :class="[
                active ? 'bg-gray-100 text-gray-900 dark:bg-indigo-600' : 'text-gray-700',
                'flex w-full items-center justify-between group w-full px-3.5 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer\t',
              ]"
            >
              <span class="flex min-w-0 items-center justify-between space-x-3">
                <InboxIcon class="h-5 w-5 text-gray-400 dark:text-primary-300" />
                <span class="flex min-w-0 flex-1 flex-col">
                  <span class="truncate font-medium text-gray-900 dark:text-gray-100">
                    {{ inbox.name }}
                  </span>
                  <span class="truncate text-sm text-gray-600 dark:text-gray-200 italic">
                    {{ inbox.senderAddresses[0] }}
                  </span>
                </span>
              </span>
            </span>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import { MenuButton, MenuItem, MenuItems, Menu } from "@headlessui/vue";
import { ChevronUpDownIcon, InboxIcon } from "@heroicons/vue/20/solid";
import { mapState } from "pinia";
import { useInboxStore } from "@/stores/models/inbox";

export default {
  name: "InboxSelector",
  components: {
    MenuButton,
    MenuItems,
    MenuItem,
    Menu,
    ChevronUpDownIcon,
    InboxIcon,
  },
  computed: {
    ...mapState(useInboxStore, ["getInboxes"]),
  },
};
</script>

<style scoped></style>
