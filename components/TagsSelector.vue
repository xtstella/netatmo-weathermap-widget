<template>
  <div class="w-full">
    <div class="w-full h-10 font-bold">
      <h6 class="py-2 bg-gray-100 font-bold my-auto px-3">
        {{ title }}
      </h6>
    </div>
    <transition-group
      name="tagsGroup"
      tag="div"
      class="w-full h-12 bg-white h-max p-2 gap-1 overflow-hidden"
    >
      <div
        v-show="selectedTags.length === 0"
        key="div-empty-selected-tags"
        class="text-xs w-max text-gray-400 font-medium py-0.5 h-max gap-1 inline-block m-1"
      >
        <h6 class="bg-transparent my-auto">{{ messageNoSelectedTags }}</h6>
      </div>
      <div
        v-for="item in selectedTags"
        v-show="selectedTags.length !== 0"
        :key="item"
        class="text-sm bg-pink-300 w-max font-medium px-3 py-0.5 h-max gap-1 inline-block m-1 rounded-lg"
      >
        <div
          class="flex cursor-pointer rounded-lg transition-all"
          @click.prevent="removeTag(item)"
        >
          <h6 class="bg-transparent my-auto">{{ item }}</h6>
          <button>
            <svg-icon
              name="close"
              class="h-4 w-4 my-auto text-sm text-black -mb-0.5 ml-1"
            />
          </button>
        </div>
      </div>
    </transition-group>
    <transition-group
      name="listGroup"
      tag="div"
      class="w-full bg-stone-200 transition-all flex flex-col shadow-xl overflow-hidden"
    >
      <button
        v-for="item in selectableTags"
        :key="item"
        class="h-10 hover:bg-pink-200 bg-white active:bg-pink-300 font-medium text-slate-700 transition-all duration-500"
        @click.prevent="selectTag(item)"
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
    messageNoSelectedTags: {
      type: String,
      default: '',
    },
  },
  methods: {
    selectTag(item) {
      this.$emit('updateSelectedTags', this.selectedTags.concat(item))
    },
    removeTag(item) {
      this.$emit(
        'updateSelectedTags',
        this.selectedTags.filter((taf) => taf !== item)
      )
    },
  },
}
</script>

<style scoped>

.tagsGroup-enter-active,
.tagsGroup-leave-active {
  transition: all 1s ease;
}
.tagsGroup-enter-from,
.tagsGroup-leave-to {
  opacity: 0;
  transform: scaleX(0%);
  margin-left: -30px;
}


.listGroup-enter-active,
.listGroup-leave-active {
  transition: all 1s ease;
}
.listGroup-enter-from,
.listGroup-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
