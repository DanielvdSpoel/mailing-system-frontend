<template>
  <div class="relative mt-2 flex items-start">
    <div class="mt-0.5 flex h-5 items-center">
      <input
        :id="name"
        :aria-describedby="label + '-description'"
        :name="label"
        type="checkbox"
        class="focus:ring-primary-500 text-primary-600 h-4 w-4 rounded border-gray-300"
        v-on:input="$emit('update:modelValue', $event.target.value)"
        v-bind:value="modelValue"
        :ref="name"
      />
    </div>
    <div class="ml-2 text-sm">
      <label :for="name" class="font-medium text-gray-700">{{ label }}</label>
      <p v-if="description" class="max-w-md text-sm text-gray-500">
        {{ description }}
      </p>
      <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckBoxField",
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    modelValue: String | Boolean,
    form: Object,
    name: String,
    label: String,
    placeholder: String,
    description: String,
    required: Boolean,
    disabled: Boolean,
  },
  mounted() {
    if (typeof this.modelValue === "string") {
      this.$emit("update:modelValue", this.modelValue === "true");
    }
  },
  computed: {
    error() {
      return null;
    },
  },
};
</script>
