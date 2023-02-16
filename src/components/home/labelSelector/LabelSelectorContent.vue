<template>
  <div class="p-2">
    <label
      for="label-search"
      class="block text-sm font-medium text-gray-700 dark:text-gray-200"
    >
      {{ label }}
    </label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        type="text"
        name="search"
        id="label-search"
        v-model="search"
        class="block z-20 w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-900"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
    <div class="divide-y divide-gray-100 gap-4 dark:divide-gray-700 mt-2">
      <div class="max-h-52 overflow-y-scroll">
        <LabelSelectorRow
          v-for="label in labels"
          v-model="selectedLabels[label.id]"
          @reset-indeterminate="indeterminateLabels[label.id] = false"
          :is-indeterminate="indeterminateLabels[label.id]"
          :key="label.id"
          :closePanel="close"
          :label="label"
        />
      </div>
      <div>
        <div>
          <a
            class="block px-4 py-2 text-sm cursor-pointer rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-gray-900 hover:dark:text-gray-100"
          >
            Create new label
          </a>
        </div>
        <div>
          <a
            @click="submit"
            class="block px-4 py-2 text-sm cursor-pointer rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-gray-900 hover:dark:text-gray-100"
          >
            Submit
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import LabelSelectorRow from "@/components/home/labelSelector/LabelSelectorRow.vue";
import { useLabelStore } from "@/stores/models/label";
import { useSelectedEmailStore } from "@/stores/selectedEmails";
import { useEmailStore } from "@/stores/models/email";

export default {
  name: "LabelSelectorContent",
  components: {
    MagnifyingGlassIcon,
    LabelSelectorRow,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
  },
  mounted() {
    //This is a bit of a hack to get the labels to be selected
    const counts = {};
    useSelectedEmailStore().selectedEmails.forEach((email) => {
      useEmailStore()
        .getEmailById(email)
        .labels.forEach((label) => {
          if (counts[label.id]) {
            counts[label.id] += 1;
          } else {
            counts[label.id] = 1;
          }
        });
    });
    // If the count of the label is equal to the number of selected emails, then it is selected, otherwise it is indeterminate
    Object.keys(counts).forEach((label) => {
      if (counts[label] === useSelectedEmailStore().selectedEmails.length) {
        this.selectedLabels[label] = true;
      } else {
        this.indeterminateLabels[label] = true;
      }
    });
  },
  data() {
    return {
      search: "",
      selectedLabels: {},
      indeterminateLabels: {},
    };
  },
  methods: {
    submit() {
      const baseLabels = [];
      Object.keys(this.selectedLabels).forEach((label) => {
        if (this.selectedLabels[label]) {
          baseLabels.push(label);
        }
      });

      useSelectedEmailStore().selectedEmails.forEach((email) => {
        const emailObj = useEmailStore().getEmailById(email);
        const labels = [...baseLabels];

        emailObj.labels.forEach((label) => {
          if (this.indeterminateLabels[label.id]) {
            labels.push(label.id);
          }
        });
        //todo make http call to update labels
      });
    },
  },
  computed: {
    labels() {
      return useLabelStore().getLabels.filter((label) => {
        return label.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped></style>
