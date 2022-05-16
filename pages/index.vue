<template>
  <div class="h-[90vh]">
    <div class="w-screen mt-10 bg-white h-[35vh] overflow-y-scroll">
      <tags-selector
        title="Selected Cities"
        :selectable-tags="selectableTags"
        :selected-tags="selectedTags"
        :is-loading="isLoading"
        message-no-selected-tags="Please choose at lease one city from the list"
        @updateSelectedTags="updateSelectedTags"
      ></tags-selector>
    </div>
    <div class="w-screen mt-10 bg-white h-[35vh] overflow-y-scroll">
      <base-table
        :headers="headers"
        :rows="tableRows"
        :is-loading="isLoading"
        message-no-rows="No City Selected"
      >
      </base-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'dashboard',
  data() {
    return {
      isLoading: false,
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
  methods: {
    async fetchWeatherData() {
      this.isLoading = true
      if (this.$auth.strategy.token.status().valid()) {
        const params = {
          token: this.$auth.strategy.token.get(),
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
    async updateSelectedTags(event) {
      const selectedCities = await this.defaultCities.filter((city) => {
        return event.includes(city.city)
      })
      await this.$store.dispatch('city/setSelectedCities', selectedCities)
      this.fetchWeatherData()
    },
  },
}
</script>
