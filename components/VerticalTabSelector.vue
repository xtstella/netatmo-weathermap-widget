<template>
  <div class="flex flex-col w-full h-full grid grid-cols-1 divide-y">
    <button
      v-for="(option, index) in options"
      :key="index"
      class="flex flex-col justify-center w-full text-white hover:bg-opacity-70 active:bg-opacity-40"
      :class="[option.colorClass]"
      @click="selectTab(index)"
    >
      <h6 class="mx-auto text-lg font-bold tracking-wider uppercase">
        {{ option.title }}
      </h6>
      <svg-icon :name="option.iconName" class="mx-auto w-10 h-10" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    selectTab() {},
  },
}
</script>

<style></style>
