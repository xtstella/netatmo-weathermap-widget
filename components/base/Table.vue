<template>
  <div v-if="rows" class="w-full bg-white">
    <table class="w-full">
      <thead>
        <tr>
          <th
            v-for="(header, i) in headers"
            :key="i"
            class="cursor-pointer text-left text-bluescale-200 text-body-median font-bold px-5 py-4 border-bluescale-400"
            :class="header.text ? 'border-b' : 'border-0'"
          >
            <span class="whitespace-nowrap">{{ header.text }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="rows.length === 0" key="div-empty-rows">
          <td class="px-5 py-5 font-light text-bluescale-200 text-body-median">
            {{ messageNoRows }}
          </td>
        </tr>
        <template v-if="isLoading" class="px-auto mx-auto">
          <loading-spinner v-show="isLoading"></loading-spinner>
        </template>
        <template v-else>
          <tr v-for="(row, i) in rows" :key="i">
            <td
              v-for="header in headers"
              :key="header.value"
              class="px-5 py-5 font-light text-bluescale-200 text-body-median"
            >
              <span class="whitespace-nowrap">{{ row[header.value] }}</span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    messageNoRows: {
      type: String,
      default: '/',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style></style>
