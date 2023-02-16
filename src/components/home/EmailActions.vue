<template>
  <div class="flex">
    <div
      v-if="shouldShowActions"
      class="flex divide-x divide-gray-200 dark:divide-gray-700"
    >
      <div v-for="group in actions" :key="group" class="flex gap-2 px-2">
        <button
          v-for="item in group"
          @click="item.action()"
          :key="item.name"
          v-tooltip="item.name"
          :class="[
            'inline-flex items-center text-gray-400 rounded-full dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5',
          ]"
        >
          <Component :is="item.icon" class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div class="flex gap-2 px-2">
        <LabelSelector title="Label and archive" label="Label as and move to:">
          <template #icon>
            <FolderArrowDownIcon class="h-5 w-5" aria-hidden="true" />
          </template>
        </LabelSelector>
      </div>
    </div>

    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton v-tooltip="'More actions'">
          <div
            class="inline-flex items-center text-gray-400 dark:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5"
          >
            <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
          </div>
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
          class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm',
                ]"
                >Account settings</a
              >
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm',
                ]"
                >Support</a
              >
            </MenuItem>
            <MenuItem v-slot="{ active }" class="hidden">
              <a
                href="#"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm',
                ]"
                >License</a
              >
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  ArchiveBoxArrowDownIcon,
  EllipsisVerticalIcon,
  ShieldExclamationIcon,
  TrashIcon,
  EnvelopeOpenIcon,
  BellSnoozeIcon,
  EnvelopeIcon,
  FolderArrowDownIcon,
} from "@heroicons/vue/24/outline";
import { useSelectedEmailStore } from "@/stores/selectedEmails";
import { useEmailStore } from "@/stores/models/email";
import LabelSelector from "@/components/home/LabelSelector.vue";
export default {
  name: "EmailActions",
  components: {
    LabelSelector,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    EllipsisVerticalIcon,
    ArchiveBoxArrowDownIcon,
    TrashIcon,
    ShieldExclamationIcon,
    EnvelopeOpenIcon,
    EnvelopeIcon,
    BellSnoozeIcon,
    FolderArrowDownIcon,
  },
  methods: {
    updateEmails(data, deselect = false) {
      const ids = useSelectedEmailStore().getSelectedIds;
      this.$http
        .patch("/emails/batch-update", { ids, ...data })
        .then((response) => {
          if (deselect) {
            useSelectedEmailStore().deselectAllEmails();
          }
          useEmailStore().fetchEmails();
        });
    },
  },
  computed: {
    shouldShowActions() {
      return useSelectedEmailStore().selectedEmails.length > 0;
    },
    actions() {
      return [
        [
          {
            name: "Archive",
            icon: "ArchiveBoxArrowDownIcon",
            action: () => {
              this.updateEmails({ is_archived: true }, true);
            },
          },
          {
            name: "Delete",
            icon: "TrashIcon",
            action: () => {
              this.updateEmails({ is_deleted: true }, true);
            },
          },
          {
            name: "Mark as spam",
            icon: "ShieldExclamationIcon",
            action: () => {
              console.log("spam");
            },
          },
        ],
        [
          {
            name: "Mark as read",
            icon: "EnvelopeOpenIcon",
            action: () => {
              this.updateEmails({ is_read: true });
            },
          },
          {
            name: "Mark as unread",
            icon: "EnvelopeIcon",
            action: () => {
              this.updateEmails({ is_read: false });
            },
          },
          {
            name: "Snooze",
            icon: "BellSnoozeIcon",
            action: () => {
              console.log("snooze");
            },
          },
        ],
      ];
    },
  },
};
</script>

<style scoped></style>
