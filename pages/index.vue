<template>
  <div class="h-[90vh]">
    <div class="w-screen mt-10 bg-white h-[35vh] overflow-y-scroll">
      <tags-selector
        title="Selected Cities"
        :selectable-tags="selectableTags"
        :selected-tags="selectedTags"
        :is-loading="isLoading"
        message-no-selected-tags="Please choose at lease one city from the list"
        @updateSelectedTags="updateSelectedCities"
      ></tags-selector>
    </div>
    <div class="w-screen mt-10 bg-white h-[35vh] flex flex-row">
      <div class="w-4/5 overflow-y-scroll">
        <base-table
          :headers="tableHeaders[selectedMeasureType.value]"
          :rows="tableRows"
          :is-loading="isLoading"
          message-no-rows="No City Selected"
        >
        </base-table>
      </div>
      <div class="w-1/5 h-full">
        <vertical-tab-selector
          :options="measurementOptions"
          @updateSelectedTab="updateSelectedMeasureType"
        ></vertical-tab-selector>
      </div>
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
      tableHeaders: {
        temperature: [
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
        rain: [
          {
            text: 'City',
            value: 'city',
          },
          {
            text: 'Rain 24h',
            value: 'rain_24h',
          },
          {
            text: 'Rain 60min',
            value: 'rain_60min',
          },
          {
            text: 'Rain Live',
            value: 'rain_live',
          },
          {
            text: 'Rain Timeutc',
            value: 'rain_timeutc',
          },
        ],
         wind: [
          {
            text: 'City',
            value: 'city',
          },
          {
            text: 'Gust Angle',
            value: 'gust_angle',
          },
          {
            text: 'Gust Strength',
            value: 'gust_strength',
          },
          {
            text: 'Wind Angle',
            value: 'wind_angle',
          },
          {
            text: 'Wind Strength',
            value: 'wind_strength',
          },
          {
            text: 'Wind Timeutc',
            value: 'wind_timeutc',
          },
        ],
      },
      measurementOptions: [
        {
          colorClass: 'bg-amber-500',
          iconName: 'temperature',
          title: 'Temperature',
          value: 'temperature',
        },
        {
          colorClass: 'bg-blue-500',
          iconName: 'rain',
          title: 'Rain',
          value: 'rain',
        },
        {
          colorClass: 'bg-green-500',
          iconName: 'wind',
          title: 'Wind',
          value: 'wind',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      defaultCities: 'city/getDefaultCities',
      selectableCityList: 'city/getSelectableCityList',
      selectedCities: 'city/getSelectedCities',
      selectedMeasureType: 'city/getSelectedMeasureType',
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
    async updateSelectedCities(event) {
      const selectedCities = await this.defaultCities.filter((city) => {
        return event.includes(city.city)
      })
      await this.$store.dispatch('city/setSelectedCities', selectedCities)
      this.fetchWeatherData()
    },
    async updateSelectedMeasureType(event) {
      await this.$store.dispatch('city/setSelectedMeasureType', event)
      this.fetchWeatherData()
    },
  },
}
</script>
