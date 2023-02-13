<template>
  <Menu as="div" class="text-left">
    <div>
      <MenuButton
        class="hover:bg-primary-800 group w-full rounded-md bg-indigo-600 px-3.5 py-2 text-left text-sm font-medium text-gray-700"
      >
        <span class="flex w-full items-center justify-between">
          <span class="flex min-w-0 items-center justify-between space-x-3">
            <InboxIcon class="text-primary-300 h-5 w-5" />
            <span class="flex min-w-0 flex-1 flex-col">
              <span class="truncate text-sm font-medium text-white">
                {{ getSelectedInbox.name }}
              </span>
              <span class="text-primary-100 truncate text-sm">
                {{ getSelectedInbox.senderAddresses[0] }}
              </span>
            </span>
          </span>
          <ChevronUpDownIcon
            class="group-hover:text-primary-200 h-5 w-5 flex-shrink-0 text-white"
            aria-hidden="true"
          />
        </span>
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="scale-95 transform opacity-0"
      enter-to-class="scale-100 transform opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="scale-100 transform opacity-100"
      leave-to-class="scale-95 transform opacity-0"
    >
      <MenuItems
        class="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
      >
        <div class="divide-y divide-gray-200 py-1 dark:divide-gray-700">
          <MenuItem @click="selectInbox(null)" as="div" v-slot="{ active }">
            <span
              :class="[
                active || getSelectedInbox.id == null
                  ? 'bg-gray-100 text-gray-900 dark:bg-indigo-600'
                  : 'text-gray-700',
                'flex w-full items-center justify-between group w-full px-3.5 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer\t',
              ]"
            >
              <span class="flex min-w-0 items-center justify-between space-x-3">
                <InboxIcon
                  class="dark:text-primary-300 h-5 w-5 text-gray-400"
                />
                <span class="flex min-w-0 flex-1 flex-col">
                  <span
                    class="truncate font-medium text-gray-900 dark:text-gray-100"
                  >
                    Global inbox
                  </span>
                  <span
                    class="truncate text-sm italic text-gray-600 dark:text-gray-200"
                  >
                    All inboxes
                  </span>
                </span>
              </span>
            </span>
          </MenuItem>

          <MenuItem
            v-for="inbox in getInboxes"
            :key="inbox.id"
            @click="selectInbox(inbox)"
            as="div"
            v-slot="{ active }"
          >
            <span
              :class="[
                active || inbox.id === getSelectedInbox.id
                  ? 'bg-gray-100 text-gray-900 dark:bg-indigo-600'
                  : 'text-gray-700',
                'flex w-full items-center justify-between group w-full px-3.5 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer\t',
              ]"
            >
              <span class="flex min-w-0 items-center justify-between space-x-3">
                <InboxIcon
                  class="dark:text-primary-300 h-5 w-5 text-gray-400"
                />
                <span class="flex min-w-0 flex-1 flex-col">
                  <span
                    class="truncate font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ inbox.name }}
                  </span>
                  <span
                    class="truncate text-sm italic text-gray-600 dark:text-gray-200"
                  >
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
import { useEmailStore } from "@/stores/models/email";

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
    ...mapState(useEmailStore, ["getSelectedInbox"]),
    ...mapState(useInboxStore, ["getInboxes"]),
  },
  methods: {
    selectInbox(inbox) {
      useEmailStore().selectInbox(inbox);
    },
  },
};
</script>

<style scoped></style>
