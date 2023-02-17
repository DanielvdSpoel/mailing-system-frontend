<template>
  <div class="px-3 mt-2 w-[75%]">
    <label for="search" class="sr-only">Search</label>
    <div
      v-click-away="clickAway"
      :class="[
        open ? 'border border-gray-300 dark:border-gray-800' : '',
        'relative mt-1 rounded-md shadow-2xl',
      ]"
    >
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex mt-3 pl-3"
        aria-hidden="true"
      >
        <MagnifyingGlassIcon
          class="mr-3 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <form @submit.prevent="fullSearch">
        <input
          @click="open = true"
          v-model="query"
          type="text"
          :class="[
            open
              ? 'rounded-t-md'
              : 'rounded-md border-gray-300 dark:border-gray-800',
            'block w-full focus:border-none focus:ring-0 focus:ring-offset-0  pl-9 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-800',
          ]"
          placeholder="Search"
        />
      </form>
      <TransitionRoot :show="open" appear>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <div
            class="w-full p-3 transform overflow-hidden rounded-b-md bg-white dark:bg-gray-700 border-t border-gray-300 dark:border-gray-800 transition-all max-h-[90vh] overflow-y-scroll"
          >
            <ul>
              <li v-if="results.emails.length > 0">
                <h2
                  class="text-xs font-semibold text-gray-900 dark:text-gray-100"
                >
                  Emails
                </h2>
                <ul class="-mx-4 mt-2 text-sm text-gray-700 dark:text-gray-200">
                  <div
                    v-for="email in results.emails"
                    :key="email.id"
                    class="group"
                  >
                    <li
                      class="flex cursor-default select-none items-center px-4 py-2 group-hover:bg-indigo-600 group-hover:text-white"
                    >
                      <EnvelopeIcon
                        class="h-6 w-6 flex-none group-hover:text-white text-gray-400"
                        aria-hidden="true"
                      />
                      <div class="w-full">
                        <div class="flex">
                          <span class="ml-3 flex-auto truncate">{{
                            email.subject
                          }}</span>
                          <span
                            class="flex-auto truncate text-right text-gray-400 group-hover:text-gray-200 italic text-sm"
                            >{{ getTime(email) }}</span
                          >
                        </div>
                        <div>
                          <span
                            class="ml-3 flex-auto truncate text-gray-400 group-hover:text-gray-200 italic text-sm"
                            >{{ email.sender.label }}</span
                          >
                        </div>
                      </div>
                    </li>
                  </div>
                </ul>
              </li>
              <li v-if="results.email_addresses.length > 0">
                <h2
                  class="text-xs font-semibold text-gray-900 dark:text-gray-100"
                >
                  Contacts
                </h2>
                <ul class="-mx-4 mt-2 text-sm text-gray-700 dark:text-gray-200">
                  <div
                    v-for="email_address in results.email_addresses"
                    :key="email_address.id"
                    class="group"
                  >
                    <li
                      @click="emailAddressSearch(email_address)"
                      class="flex cursor-default select-none items-center px-4 py-2 group-hover:bg-indigo-600 group-hover:text-white"
                    >
                      <UserIcon
                        class="h-6 w-6 flex-none group-hover:text-white text-gray-400"
                        aria-hidden="true"
                      />
                      <span class="ml-3 flex-auto truncate">
                        {{ email_address.label }}
                      </span>
                      <span
                        class="flex-auto truncate text-right text-gray-400 group-hover:text-gray-200 italic text-sm"
                        >{{ email_address.email }}</span
                      >
                    </li>
                  </div>
                </ul>
              </li>
              <li v-if="results.labels.length > 0">
                <h2
                  class="text-xs font-semibold text-gray-900 dark:text-gray-100"
                >
                  Labels
                </h2>
                <ul class="-mx-4 mt-2 text-sm text-gray-700 dark:text-gray-200">
                  <div
                    v-for="label in results.labels"
                    :key="label.id"
                    class="group"
                  >
                    <li
                      @click="labelSearch(label)"
                      class="flex cursor-default select-none items-center px-4 py-2 group-hover:bg-indigo-600 group-hover:text-white"
                    >
                      <TagIcon
                        class="h-6 w-6 flex-none group-hover:text-white text-gray-400"
                        aria-hidden="true"
                      />
                      <span class="ml-3 flex-auto truncate">{{
                        label.name
                      }}</span>
                    </li>
                  </div>
                </ul>
              </li>
            </ul>
            <div
              v-if="hasNoResults"
              class="py-14 px-6 text-center text-sm sm:px-14"
            >
              <ExclamationTriangleIcon
                class="mx-auto h-6 w-6 text-gray-400 dark:text-gray-300"
                aria-hidden="true"
              />
              <p class="mt-4 font-semibold text-gray-900 dark:text-gray-100">
                No results found
              </p>
              <p class="mt-2 text-gray-500 dark:text-gray-200">
                We couldn’t find anything with that term. Please try again.
              </p>
            </div>
          </div>
        </TransitionChild>
      </TransitionRoot>
    </div>
  </div>
</template>

<script>
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/vue/20/solid";
import { TransitionChild, TransitionRoot } from "@headlessui/vue";
import { debounce } from "@/composables/debounce";
import { useEmailStore } from "@/stores/models/email";
import { EnvelopeIcon } from "@heroicons/vue/24/solid";
import { DateTime } from "luxon";
export default {
  name: "SearchBar",
  components: {
    TransitionChild,
    TransitionRoot,
    MagnifyingGlassIcon,
    UserIcon,
    ExclamationTriangleIcon,
    TagIcon,
    EnvelopeIcon,
  },
  data() {
    return {
      query: "",
      open: false,
      results: {
        labels: [],
        email_addresses: [],
        emails: [],
      },
    };
  },
  methods: {
    emailAddressSearch(email_address) {
      useEmailStore().setSenderId(email_address.id);
      this.open = false;
      this.query = "";
    },
    labelSearch(label) {
      useEmailStore().setLabelId(label.id);
      this.open = false;
      this.query = "";
    },
    fullSearch() {
      useEmailStore().setSearch(this.query);
      this.open = false;
    },
    clickAway() {
      this.open = false;
    },
    getTime(email) {
      const received = DateTime.fromFormat(
        email.received_at,
        "yyyy-MM-dd HH:mm:ss"
      );
      const now = DateTime.now();
      if (received.hasSame(now, "day")) {
        return received.toFormat("HH:mm");
      }
      if (received.hasSame(now, "year")) {
        return received.toFormat("d LLL.");
      }
      return received.toFormat("dd-MM-yyyy");
    },
  },
  computed: {
    hasNoResults() {
      return (
        this.query !== "" &&
        this.results.labels.length === 0 &&
        this.results.email_addresses.length === 0 &&
        this.results.emails.length === 0
      );
    },
  },
  created() {
    const that = this;
    this.debouncedFetch = debounce((value) => {
      Object.keys(this.results).forEach((category) => {
        this.$http
          .get("/" + category.replace("_", "-"), {
            params: {
              search: value,
              limit: 5,
              no_pagination: true,
            },
          })
          .then((response) => {
            that.results[category] = response.data.data;
            console.log(that.results);
          });
      });
    }, 1000);
  },
  watch: {
    query(...args) {
      this.debouncedFetch(...args);
    },
  },
};
</script>

<style scoped></style>
