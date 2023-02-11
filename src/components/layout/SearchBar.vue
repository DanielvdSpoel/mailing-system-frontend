<template>
  <div class="flex flex-1">
    <form class="flex w-full md:ml-0" action="#" method="GET">
      <label for="search-field" class="sr-only">Search</label>
      <div
        class="relative w-full text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300"
      >
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center"
        >
          <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="search-field"
          class="block h-full w-full dark:bg-gray-700 border-transparent py-2 pl-8 pr-3 text-gray-900 dark:text-gray-200 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
          placeholder="Search"
          type="search"
          name="search"
        />
      </div>
    </form>
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
