<template>
  <div class="loading-page">
    <div class="loader"></div>
  </div>
</template>
<style scoped>
.loading-page {
  top: 50%;
  right: 50%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border: 4px solid #ECF0FB;
  border-radius: 50%;
  border-top-color: #ff7043;
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
