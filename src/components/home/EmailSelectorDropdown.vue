<template>
  <div class="flex gap-1">
    <div class="mt-1 flex h-6 items-center">
      <input
        type="checkbox"
        :indeterminate.prop="true"
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
    </div>

    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton>
          <div
            class="inline-flex items-center rounded-md py-1.5 text-gray-400 hover:bg-gray-100"
          >
            <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
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
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm',
                ]"
                >License</a
              >
            </MenuItem>
            <form method="POST" action="#">
              <MenuItem v-slot="{ active }">
                <button
                  type="submit"
                  :class="[
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm',
                  ]"
                >
                  Sign out
                </button>
              </MenuItem>
            </form>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

export default {
  name: "EmailSelectorDropdown",
  components: { Menu, MenuButton, MenuItem, MenuItems, ChevronDownIcon },
};
</script>

<style scoped></style>
