<template>
  <div class="bg-gray-100 dark:bg-gray-900 min-h-screen">
    <SidebarNavigation />
    <div class="flex flex-1 flex-col md:pl-64">
      <div
        class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white dark:bg-gray-700 shadow"
      >
        <SidebarButton />
        <div class="flex flex-1 justify-between px-4">
          <SearchBar />
          <div class="ml-4 flex items-center md:ml-6">
            <NotificationsSlideout />

            <ProfileButton />
          </div>
        </div>
      </div>

      <main>
        <div class="py-6">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-200">
              Dashboard
            </h1>
          </div>
          <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { BellIcon } from "@heroicons/vue/24/outline";
import SidebarNavigation from "@/components/layout/SidebarNavigation.vue";
import SidebarButton from "@/components/layout/SidebarButton.vue";
import ProfileButton from "@/components/layout/ProfileButton.vue";
import SearchBar from "@/components/layout/SearchBar.vue";
import NotificationsSlideout from "@/components/layout/NotificationsSlideOut.vue";

export default {
  name: "MainLayout",
  components: {
    NotificationsSlideout,
    SearchBar,
    ProfileButton,
    SidebarButton,
    SidebarNavigation,
    BellIcon,
  },
};
</script>

<style scoped></style>
