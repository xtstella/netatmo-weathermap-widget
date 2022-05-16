<template>
  <div>
  
    
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  methods: {
    async login() {
      const token = await this.$authService().getAcessToken(
        process.env.DEV_NETATMO_USER_NAME,
        process.env.DEV_NETATMO_PASSWORD
      )
      const testLocationParams = {
        lat_ne: 48.86471476180278,
        lat_sw: 48.86471476180278,
        lon_ne: 2.373046875,
        lon_sw: 2.3291015625,
      }
      const requiredData = 'temperature'
      const ifFilter = 'false'
      const result = await this.$weatherService().getPublicData(
        token,
        testLocationParams,
        requiredData,
        ifFilter
      )
      console.log(result.body)
    },
  },
}
</script>
