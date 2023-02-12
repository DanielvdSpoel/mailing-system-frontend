<template>
  <div>
    <TransitionRoot as="template" :show="getSidebarState">
      <Dialog
        as="div"
        class="relative z-40 md:hidden"
        @close="setSideBarState(false)"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 dark:bg-gray-800 pt-5 pb-4"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="setSideBarState(false)"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex flex-shrink-0 items-center px-4 space-x-3">
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                  alt="Your Company"
                />
                <a class="h-8 text-md font-semibold text-white mt-0.5"
                  >Mailing system</a
                >
              </div>
              <div class="mt-5 h-0 flex-1 overflow-y-auto">
                <nav class="px-2">
                  <div class="space-y-1">
                    <a
                      v-for="inbox in getInboxes"
                      :key="inbox.id"
                      :class="[
                        false
                          ? 'bg-primary-800 text-white'
                          : 'text-primary-100 hover:bg-primary-600',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                      ]"
                    >
                      <InboxIcon
                        class="mr-4 h-6 w-6 flex-shrink-0 text-primary-300"
                        aria-hidden="true"
                      />
                      {{ inbox.name }}
                    </a>
                  </div>
                  <div class="mt-8">
                    <!-- Secondary navigation -->
                    <h3
                      class="px-3 text-sm font-medium text-primary-100"
                      id="desktop-teams-headline"
                    >
                      Labels
                    </h3>
                    <div
                      class="mt-1 space-y-1"
                      role="group"
                      aria-labelledby="desktop-teams-headline"
                    >
                      <a
                        v-for="label in getLabels"
                        :key="label.name"
                        href="#"
                        class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-primary-100 hover:bg-primary-600"
                      >
                        <span
                          :class="[
                            getLabelColorClass(label),
                            'w-2.5 h-2.5 mr-4 rounded-full ',
                          ]"
                          aria-hidden="true"
                        />
                        <span class="truncate">{{ label.name }}</span>
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex flex-grow flex-col overflow-y-auto bg-primary-700 pt-5 dark:bg-gray-800"
      >
        <div class="flex flex-shrink-0 items-center px-4 space-x-3">
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
            alt="Your Company"
          />
          <a class="h-8 text-md font-semibold text-white mt-0.5"
            >Mailing system</a
          >
        </div>
        <div class="mt-5 flex flex-1 flex-col">
          <nav class="flex-1 px-2 pb-4">
            <InboxSelector />

            <button
              type="button"
              class="m-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <EnvelopeIcon class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
              Compose email
            </button>

            <div class="mt-8">
              <!-- Secondary navigation -->
              <h3
                class="px-3 text-sm font-medium text-primary-100"
                id="desktop-teams-headline"
              >
                Labels
              </h3>
              <div
                class="mt-1 space-y-1"
                role="group"
                aria-labelledby="desktop-teams-headline"
              >
                <a
                  v-for="label in getLabels"
                  :key="label.name"
                  href="#"
                  class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-primary-100 hover:bg-primary-600"
                >
                  <span
                    :class="[
                      getLabelColorClass(label),
                      'w-2.5 h-2.5 mr-4 rounded-full ',
                    ]"
                    aria-hidden="true"
                  />
                  <span class="truncate">{{ label.name }}</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { InboxIcon, EnvelopeIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useLayoutStore } from "@/stores/layout";
import { mapState } from "pinia";
import {
  Dialog,
  DialogPanel,
  Menu,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useInboxStore } from "@/stores/models/inbox";
import { useLabelStore } from "@/stores/models/label";
import InboxSelector from "@/components/layout/InboxSelector.vue";

export default {
  name: "SidebarNavigation",
  components: {
    InboxSelector,
    Dialog,
    DialogPanel,
    Menu,
    TransitionChild,
    TransitionRoot,
    XMarkIcon,
    InboxIcon,
    EnvelopeIcon,
  },
  methods: {
    getLabelColorClass(label) {
      switch (label.color) {
        case "black":
          return "bg-black";
        case "slate":
          return "bg-slate-600";
        case "gray":
          return "bg-gray-600";
        case "red":
          return "bg-red-600";
        case "orange":
          return "bg-orange-600";
        case "amber":
          return "bg-amber-600";
        case "yellow":
          return "bg-yellow-600";
        case "lime":
          return "bg-lime-600";
        case "green":
          return "bg-green-600";
        case "emerald":
          return "bg-emerald-600";
        case "teal":
          return "bg-teal-600";
        case "cyan":
          return "bg-cyan-600";
        case "sky":
          return "bg-sky-600";
        case "blue":
          return "bg-blue-600";
        case "indigo":
          return "bg-indigo-600";
        case "violet":
          return "bg-violet-600";
        case "purple":
          return "bg-purple-600";
        case "fuchsia":
          return "bg-fuchsia-600";
        case "pink":
          return "bg-pink-600";
        case "rose":
          return "bg-rose-600";
        default:
          return "bg-gray-600";
      }
    },
    setSideBarState(state) {
      useLayoutStore().setSidebarState(state);
    },
  },
  computed: {
    ...mapState(useLayoutStore, ["getSidebarState"]),
    ...mapState(useInboxStore, ["getInboxes"]),
    ...mapState(useLabelStore, ["getLabels"]),
  },
};
</script>

<style scoped></style>
