<template>
  <div
    @click="toggleLabel"
    class="flex w-full gap-2 px-4 py-2 cursor-pointer rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-gray-900 hover:dark:text-gray-100"
  >
    <input
      @click="checkboxClicked"
      v-model="internalValue"
      :indeterminate.prop="isIndeterminate"
      type="checkbox"
      class="h-4 w-4 mt-1 rounded border-gray-300 dark:border-gray-900 dark:bg-gray-600 text-indigo-600 focus:ring-indigo-500"
    />
    <a class="block text-sm">
      {{ label.name }}
    </a>
  </div>
</template>

<script>
import { useSelectedEmailStore } from "@/stores/selectedEmails";
import { useEmailStore } from "@/stores/models/email";

export default {
  name: "LabelSelectorRow",
  props: {
    label: Object,
    isIndeterminate: Boolean,
    modelValue: Boolean,
    closePanel: Function,
  },
  data() {
    return {
      internalValue: false,
      checkboxClick: false,
    };
  },
  methods: {
    checkboxClicked() {
      this.checkboxClick = true;
    },
    toggleLabel() {
      if (!this.checkboxClick) {
        this.$emit("submit");
      }
      this.checkboxClick = false;
    },
  },
  watch: {
    internalValue(value) {
      this.$emit("reset-indeterminate", value);
      this.$emit("update:modelValue", value);
    },
    modelValue(value) {
      if (value !== this.internalValue) {
        this.internalValue = value;
      }
    },
  },
};
</script>

<style scoped></style>
