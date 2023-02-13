<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-16 w-auto rounded-xl"
        src="@/assets/icon.png"
        alt="Mailing system"
      />
      <h2
        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
      >
        <slot name="title" />
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="bg-white py-8 px-4 shadow dark:bg-gray-700 sm:rounded-lg sm:px-10"
      >
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style scoped></style>
