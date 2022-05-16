<template>
  <div
    class="px-4 bg-amber-100 shadow-lg grid grid-cols-12 w-screen"
  >
    <div class="col-span-2 py-6">
      <img src="@/assets/netatmo-logo.svg" alt="logo" class="h-8" />
    </div>
    <div class="col-span-8 py-6 mx-auto mt-4 text-title-large">
      <slot></slot>
    </div>
    <button class="col-span-2" @click="login">Login</button>
  </div>
</template>
