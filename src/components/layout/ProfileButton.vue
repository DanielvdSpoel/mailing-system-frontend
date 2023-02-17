<template>
  <Menu as="div" class="relative ml-3">
    <div>
      <MenuButton
        class="flex max-w-xs items-center rounded-full bg-white dark:bg-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span class="sr-only">Open user menu</span>
        <img
          class="h-8 w-8 rounded-full hidden dark:block"
          :src="
            'https://ui-avatars.com/api/?name=' + name + '&background=4b5563&color=fff'
          "
          alt=""
        />
        <img
            class="h-8 w-8 rounded-full dark:hidden"
            :src="
            'https://ui-avatars.com/api/?name=' + name + '&background=e5e7eb'
          "
            alt=""
        />
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
          class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-4 py-3">
          <p class="text-sm dark:text-gray-200">Signed in as</p>
          <p class="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
            {{ user.email }}
          </p>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <a
                href="#"
                :class="[
                  active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-200',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
            >
              <Cog8ToothIcon
                  class="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-400"
                  aria-hidden="true"
              />
              Open admin panel
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
                @click="toggleDark()"
                :class="[
                  active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-200',
                  'group w-full flex items-center px-4 py-2 text-sm dark:hidden',
                ]"
            >
              <MoonIcon
                  class="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-400"
                  aria-hidden="true"
              />
              Toggle dark mode
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
                @click="toggleDark()"
                :class="[
                  active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-200',
                  'group w-full flex items-center px-4 py-2 text-sm hidden dark:flex',
                ]"
            >
              <SunIcon
                  class="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-400"
                  aria-hidden="true"
              />
              Toggle light mode
            </button>
          </MenuItem>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <a
                href="#"
                :class="[
                  active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-200',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
            >
              <ArrowLeftOnRectangleIcon
                  class="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-400"
                  aria-hidden="true"
              />
              Sign out
            </a>
          </MenuItem>
        </div>
      </MenuItems>

    </transition>
  </Menu>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { useUserStore } from "@/stores/user";
import {
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/vue/24/outline";

export default {
  name: "ProfileButton",
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    MoonIcon,
    Cog8ToothIcon,
    ArrowLeftOnRectangleIcon,
    SunIcon,
  },
  methods: {
    toggleDarkMode() {
      console.log("toggleDarkMode");
    },
  },
  computed: {
    user() {
      return useUserStore().getUser;
    },
    name() {
      return useUserStore().getUser.name
        ? useUserStore().getUser.name.replace(" ", "+")
        : " ";
    },
  },
};
</script>
