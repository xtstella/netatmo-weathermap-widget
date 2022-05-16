<template>
  <div class="px-4 bg-amber-100 shadow-lg grid grid-cols-12 w-screen">
    <div class="col-span-2 py-6">
      <img src="@/assets/netatmo-logo.svg" alt="logo" class="h-8" />
    </div>
    <div class="col-span-8 py-5 mx-auto text-title-large">
      <slot></slot>
    </div>
    <div class="col-span-2"></div>
  </div>
</template>
