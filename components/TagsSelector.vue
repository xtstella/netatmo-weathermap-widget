<template>
  <div class="bg-gradient-to-br">
    <h6 class="w-72 h-10 bg-gray-100 text-left font-medium px-3 my-auto">
      {{ title }}
    </h6>
    <transition-group
      name="TagList"
      tag="div"
      class="w-72 h-10 bg-white rounded-md h-max p-2 gap-1 overflow-hidden"
    >
      <div
        v-for="(item, index) in selectedTags"
        :key="item"
        class="text-xs bg-pink-300 w-max text-slate-900 font-medium px-1 py-0.5 h-max gap-1 inline-block m-1"
      >
        <div class="flex cursor-pointer" @click="removeTag(item, index)">
          <h6 class="bg-transparent my-auto">{{ item }}</h6>
          <button>
            <svg-icon
              name="close"
              class="h-4 w-4 my-auto text-sm text-black -mb-1 transition-all"
            />
          </button>
        </div>
      </div>
    </transition-group>
    <transition-group
      name="list"
      tag="div"
      class="w-72 bg-stone-200 transition-all rounded-md flex flex-col shadow-xl overflow-hidden"
    >
      <button
        v-for="(item, index) in selectableTags"
        :key="item"
        class="h-10 hover:bg-pink-200 bg-white active:bg-pink-300 font-medium text-slate-700 transition-all duration-500"
        @click="selectTag(item, index)"
      >
        <h6 class="w-full text-left px-3">{{ item }}</h6>
      </button>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    selectableTags: {
      type: Array,
      default: () => [],
    },
    selectedTags: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    selectTag(item, index) {
      this.$emit('updateSelectableTags', this.selectableTags.slice(index, 1))
      this.$emit('updateSelectableTags', this.selectedTags.concat(item))
    },
    removeTag(item, index) {
      this.$emit('updateSelectableTags', this.selectedTags.concat(item))
      this.$emit('updateSelectableTags', this.selectableTags.slice(index, 1))
    },
  },
}
</script>

<style scoped></style>
