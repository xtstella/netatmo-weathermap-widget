<template>
  <div>
    <button class="flex items-center text-sm" @click="login">
      Login
    </button>
  </div>
</template>

<script>
export default {
  layout: 'default',
  methods: {
    async login() {
      const token = await this.$authService().getAcessToken(
        process.env.DEV_NETATMO_USER_NAME,
        process.env.DEV_NETATMO_PASSWORD
      )
      console.log(token)
    },
  },
}
</script>
