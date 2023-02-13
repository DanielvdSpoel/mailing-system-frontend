<template>
  <div>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton>
          <div
            class="inline-flex items-center rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
          >
            <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
          </div>
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
import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";

export default {
  name: "EmailActions",
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    EllipsisVerticalIcon,
  },
};
</script>

<style scoped></style>
