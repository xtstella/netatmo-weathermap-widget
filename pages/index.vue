<template>
  <div>
    <div class="relative pt-20 w-screen">
      <tags-selector
        title="Selected Cities"
        :selectable-tags="selectableTags"
        :selected-tags="selectedTags"
        message-no-selected-tags="Please choose at lease one city from the list"
        @updateSelectedTags="updateSelectedTags"
      ></tags-selector>
    </div>
    <loading-spinner v-show="isLoading" class="pt-12"></loading-spinner>
    <base-table
      v-show="!isLoading"
      :headers="headers"
      :rows="tableRows"
      message-no-rows="No City Selected"
      class="pt-12"
    >
    </base-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'dashboard',

  data() {
    return {
      isLoading: false,
      weatherData: [],
      requiredData: 'temperature',
      ifFilter: 'false',
      headers: [
        {
          text: 'City',
          value: 'city',
        },
        {
          text: 'Temperature',
          value: 'temperature',
        },
        {
          text: 'Humidity',
          value: 'humidity',
        },
        {
          text: 'Pressure',
          value: 'pressure',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      defaultCities: 'city/getDefaultCities',
      selectableCityList: 'city/getSelectableCityList',
      selectedCities: 'city/getSelectedCities',
    }),
    tableRows() {
      return this.selectedCities
    },
    selectedTags() {
      return this.selectedCities.map((city) => city.city)
    },
    selectableTags() {
      return this.selectableCityList.filter(
        (tag) => !this.selectedTags.includes(tag)
      )
    },
  },
  async mounted() {
    this.isLoading = true
    if (this.$auth.strategy.token.status().valid()) {
      const location = {
        lat_ne: this.selectedCities[0].lat_ne,
        lat_sw: this.selectedCities[0].lat_sw,
        lon_ne: this.selectedCities[0].lon_ne,
        lon_sw: this.selectedCities[0].lon_sw,
      }
      const params = {
        token: this.$auth.strategy.token.get(),
        location,
        requiredData: this.requiredData,
        ifFilter: this.ifFilter,
      }
      await this.$store.dispatch('city/fetchCityWeather', params)
    } else {
      const token = await this.$authService().getAcessToken(
        process.env.DEV_NETATMO_USER_NAME,
        process.env.DEV_NETATMO_PASSWORD
      )
      this.$auth.strategy.token.set(token)
    }
    this.isLoading = false
  },
  methods: {
    updateSelectedTags(event) {
      const selectedCities = this.defaultCities.filter(city => {
        return event.includes(city.city)
      })
      this.$store.dispatch('city/setSelectedCities', selectedCities)
    },
  },
}
</script>
