<template>
  <div class="flex gap-1">
    <div class="flex h-6 items-center mt-1">
      <input
        type="checkbox"
        @input="toggleEmailSelector"
        v-model="emailSelectorValue"
        :indeterminate.prop="emailSelectorIsIndeterminate"
        class="h-4 w-4 rounded border-gray-300 dark:border-gray-900 dark:bg-gray-600 text-indigo-600 focus:ring-indigo-500"
      />
    </div>

    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton v-tooltip="'Extra select options'">
          <div
            class="inline-flex items-center text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 py-1.5 rounded-md"
          >
            <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
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
          class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1">
            <MenuItem
              v-for="option in options"
              :key="option.label"
              v-slot="{ active }"
            >
              <a
                @click="selectOption(option)"
                :class="[
                  active
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    : 'text-gray-700 dark:text-gray-200',
                  'block px-4 py-2 text-sm',
                ]"
              >
                {{ option.label }}
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useSelectedEmailStore } from "@/stores/selectedEmails";
import { useEmailStore } from "@/stores/models/email";

export default {
  name: "EmailSelectorDropdown",
  components: { Menu, MenuButton, MenuItem, MenuItems, ChevronDownIcon },
  data() {
    return {
      emailSelectorIsIndeterminate: false,
      emailSelectorValue: false,
    };
  },
  mounted() {
    useSelectedEmailStore().$subscribe((mutation, state) => {
      if (
        state.selectedEmails.length > 0 &&
        state.selectedEmails.length < useEmailStore().emails.length
      ) {
        this.emailSelectorIsIndeterminate = true;
      } else if (
        state.selectedEmails.length === useEmailStore().emails.length
      ) {
        this.emailSelectorIsIndeterminate = false;
        this.emailSelectorValue = true;
      } else {
        this.emailSelectorIsIndeterminate = false;
        this.emailSelectorValue = false;
      }
    });
  },
  methods: {
    selectOption(option) {
      useSelectedEmailStore().selectEmailUsingOption(option);
    },
    toggleEmailSelector() {
      //Boolean is flipped here
      if (!this.emailSelectorValue) {
        useSelectedEmailStore().selectAllEmails();
      } else {
        useSelectedEmailStore().deselectAllEmails();
      }
    },
  },
  computed: {
    options() {
      return [
        {
          label: "Is Read",
          shouldFilter: (email) => email.is_read,
        },
        {
          label: "Is Unread",
          shouldFilter: (email) => !email.is_read,
        },
      ];
    },
  },
};
</script>

<style scoped></style>
