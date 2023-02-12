<template>
  <div class="px-3 mt-2 w-[75%]">
    <label for="search" class="sr-only">Search</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        aria-hidden="true"
      >
        <MagnifyingGlassIcon
          class="mr-3 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        class="block w-full rounded-md border-gray-300 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-900"
        placeholder="Search"
      />
    </div>
  </div>
</template>

<script>
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";

export default {
  name: "SearchBar",
  components: {
    MagnifyingGlassIcon,
  },
};
</script>

<style scoped></style>
