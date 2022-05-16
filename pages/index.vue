<template>
  <div>
    <base-table :headers="headers" :rows="tableRows"> </base-table>
    <div class="relative px-12 pt-20">
      <template v-if="isLoading">
        <loading-spinner></loading-spinner>
      </template>
      <template v-else> {{ weatherData }} </template>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  async asyncData({
    $weatherService,
    $authService,
    $auth,
    requiredData,
    ifFilter,
  }) {
    if ($auth.strategy.token.status().valid()) {
      const testLocationParams = {
        lat_ne: 48.86471476180278,
        lat_sw: 48.86471476180278,
        lon_ne: 2.373046875,
        lon_sw: 2.3291015625,
      }
      const res = await $weatherService().getPublicData(
        $auth.strategy.token.get(),
        testLocationParams,
        requiredData,
        ifFilter
      )
      return {
        weatherData: res,
      }
    } else {
      const token = await $authService().getAcessToken(
        process.env.DEV_NETATMO_USER_NAME,
        process.env.DEV_NETATMO_PASSWORD
      )
      $auth.strategy.token.set(token)
    }
    return []
  },
  data() {
    return {
      isLoading: false,
      token: '',
      selectableTags: ['Paris', 'New York', 'Berlin', 'Bogota'],
      selectedTags: [],
      weatherData: [],
      requiredData: 'temperature',
      ifFilter: 'false',
      headers: [
        {
          text: 'City',
          value: 'city'
        },
        {
          text: 'Temperature',
          value: 'temperature'
        },
        {
          text: 'Humidity',
          value: 'humidity'
        },
        {
          text: 'Pressure',
          value: 'pressure'
        },
      ],
      tableRows: [
        {
          city: 'Paris',
          temperature: '1',
        },
        {
          city: 'New York',
          temperature: '2',
        },
      ],
    }
  },
  async created() {
    this.isLoading = true
    if (!this.$auth.strategy.token.status().valid()) {
      const token = await this.$authService().getAcessToken(
        process.env.DEV_NETATMO_USER_NAME,
        process.env.DEV_NETATMO_PASSWORD
      )
      this.$auth.strategy.token.set(token)
    }
    this.isLoading = false
  },
}
</script>
