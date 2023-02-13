<template>
  <BaseField
    :name="name"
    :label="label"
    :description="description"
    :required="required"
    :form="form"
  >
    <textarea
      :id="name"
      :name="name"
      :rows="rows"
      v-on:input="$emit('update:modelValue', $event.target.value)"
      v-bind:value="modelValue"
      class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-md border-gray-300 pr-10 focus:outline-none sm:text-sm"
      :placeholder="placeholder"
      v-bind:class="{
        'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500':
          error,
      }"
    >
    </textarea>
  </BaseField>
</template>

<script>
import BaseField from "@/components/Fields/BaseField.vue";
import { useErrorStore } from "@/stores/errors";

export default {
  name: "TextareaField",
  components: { BaseField },
  props: {
    modelValue: String,
    form: Object,
    name: String,
    label: String,
    placeholder: String,
    description: String,
    required: Boolean,
    type: String,
    disabled: Boolean,
    autocomplete: String,
    rows: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    error() {
      const store = useErrorStore();
      return store.getFormError(this.name);
    },
  },
};
</script>

<style scoped></style>
