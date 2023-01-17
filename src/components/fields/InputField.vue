<template>
  <BaseField
    :name="name"
    :label="label"
    :description="description"
    :required="required"
    :test="error"
  >
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        :type="type"
        :name="name"
        :id="name"
        :autocomplete="autocomplete"
        :min="min"
        :max="max"
        v-on:input="$emit('update:modelValue', $event.target.value)"
        v-bind:value="modelValue"
        class="block w-full pr-10 border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-400 disabled:opacity-70 dark:bg-gray-800 dark:text-gray-300"
        :placeholder="placeholder"
        :disabled="disabled"
        v-bind:class="{
          'border-danger-300 text-danger-900 placeholder-danger-300 focus:ring-danger-500 focus:border-danger-500 dark:border-danger-500': error !== null,
          'dark:border-gray-900': error === null,
        }"
      />
      <div
        v-if="error !== null"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <!-- Heroicon name: solid/exclamation-circle -->
        <svg
          class="h-5 w-5 text-danger-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </BaseField>
</template>

<script>
import BaseField from "@/components/Fields/BaseField.vue";
import { useErrorStore } from "@/stores/errors.js";

export default {
  name: "InputField",
  components: { BaseField },
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    modelValue: String | Number,
    name: String,
    label: String,
    placeholder: String,
    description: String,
    required: Boolean,
    type: String,
    disabled: Boolean,
    autocomplete: String,
    min: Number,
    max: Number,
  },
  computed: {
    error() {
      console.log("error");
      const store = useErrorStore();
      return store.getFormError(this.name);
    },
  },
};
</script>
