<template>
  <Menu as="div" class="relative ml-3">
    <div>
      <MenuButton
        class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span class="sr-only">Open user menu</span>
        <img
          class="h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
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
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
      >
        <MenuItem
          v-for="item in userNavigation"
          :key="item.name"
          v-slot="{ active }"
        >
          <a
            :href="item.href"
            :class="[
              active ? 'bg-gray-100 dark:bg-indigo-600' : '',
              'block px-4 py-2 text-sm text-gray-800 dark:text-gray-200',
            ]"
            >{{ item.name }}</a
          >
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

export default {
  name: "ProfileButton",
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },
  data() {
    return {
      userNavigation: [
        { name: "Your Profile", href: "#" },
        { name: "Settings", href: "#" },
        { name: "Sign out", href: "#" },
      ],
    };
  },
};
</script>
