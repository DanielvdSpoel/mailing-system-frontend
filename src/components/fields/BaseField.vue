<template>
  <div>
    <div class="flex">
      <div class="text-white"></div>
      <label
        :for="name"
        class="block text-sm font-medium text-gray-700 dark:text-gray-200 mt-1"
        >{{ label }}</label
      >
      <span class="text-red-600 ml-0.5" v-if="required">*</span>
    </div>
    <slot />
    <p
      v-if="description"
      class="mt-2 text-sm text-gray-500"
      id="email-description"
    >
      {{ description }}
    </p>
    <p v-if="error" class="mt-2 text-sm text-red-600" id="email-error">
      {{ error }}
    </p>
  </div>
</template>

<script>
import { useErrorStore } from "@/stores/errors";

export default {
  name: "BaseField",
  props: {
    name: String,
    label: String,
    description: String,
    required: Boolean,
    test: String,
  },
  computed: {
    error() {
      const store = useErrorStore();
      return store.getFormError(this.name);
    },
  },
};
</script>
