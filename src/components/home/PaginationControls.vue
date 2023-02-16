<template>
  <div class="flex gap-2" v-if="store.urls != null">
    <Listbox as="div" v-model="amountPerPage">
      <div class="relative mt-1">
        <ListboxButton
          v-tooltip="'Select amount of emails to show'"
          class="cursor-pointer text-gray-400 dark:text-gray-500 text-sm flex hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md cursor-pointer"
        >
          <p>
            {{ store.meta.from }}-{{ store.meta.to }} of {{ store.meta.total }}
          </p>
        </ListboxButton>

        <transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-48 overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              as="template"
              v-for="option in options"
              :value="option"
              :key="option"
              v-slot="{ active, selected }"
            >
              <li
                :class="[
                  active
                    ? 'text-white bg-indigo-600'
                    : 'text-gray-900 dark:text-gray-200',
                  'relative cursor-default select-none py-2 pl-8 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  Show <span class="font-bold">{{ option }}</span> emails
                </span>

                <span
                  v-if="selected"
                  :class="[
                    active ? 'text-white' : 'text-indigo-600',
                    'absolute inset-y-0 left-0 flex items-center pl-1.5',
                  ]"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

    <button
      v-tooltip="'Previous page'"
      :disabled="store.urls.prev == null"
      @click="store.setPage(store.meta.current_page - 1)"
      :class="[
        store.urls.prev
          ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500'
          : 'text-gray-200 dark:text-gray-700',
        'inline-flex items-center rounded-full p-1.5',
      ]"
    >
      <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
    </button>
    <button
      v-tooltip="'Next page'"
      :disabled="store.urls.next == null"
      @click="store.setPage(store.meta.current_page + 1)"
      :class="[
        store.urls.next
          ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500'
          : 'text-gray-200 dark:text-gray-700',
        'inline-flex items-center rounded-full p-1.5',
      ]"
    >
      <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
    </button>
  </div>
</template>

<script>
import { useEmailStore } from "@/stores/models/email";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/20/solid";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { useSelectedEmailStore } from "@/stores/selectedEmails";

export default {
  name: "PaginationControls",
  data() {
    return {
      amountPerPage: 25,
    };
  },
  watch: {
    amountPerPage() {
      useEmailStore().setAmountPerPage(this.amountPerPage);
      useSelectedEmailStore().deselectAllEmails();
    },
  },
  computed: {
    options() {
      return [5, 25, 50, 100, 250];
    },
    store() {
      return useEmailStore();
    },
  },
  components: {
    ListboxOption,
    ListboxOptions,
    Listbox,
    ListboxButton,
    CheckIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
  },
};
</script>

<style scoped></style>
