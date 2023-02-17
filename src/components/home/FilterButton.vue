<template>
  <span
    class="inline-flex items-center rounded bg-indigo-100 py-0.5 pl-2.5 pr-1 text-sm font-medium text-indigo-700"
  >
    {{ text }}
    <button
      @click="$emit('dismiss')"
      type="button"
      class="ml-0.5 inline-flex mt-0.5 h-4 w-4 flex-shrink-0 items-center justify-center rounded text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
    >
      <span class="sr-only">{{ label }}</span>
      <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </button>
  </span>
</template>

<script>
export default {
  name: "FilterButton",
  props: {
    text: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
