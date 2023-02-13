<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <SidebarNavigation />
    <div class="flex flex-1 flex-col md:pl-64">
      <div
        class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white dark:bg-gray-800"
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
        <div class="py-3">
          <div class="mx-auto max-w-7xl px-4 sm:px-3 md:px-4">
            <slot name="content" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { EnvelopeIcon } from "@heroicons/vue/24/solid";
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
    EnvelopeIcon,
  },
};
</script>

<style scoped></style>
