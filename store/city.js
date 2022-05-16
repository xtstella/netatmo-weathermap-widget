import { cloneDeep } from 'lodash'

export const state = () => ({
  defaultCities: [
    {
      city: 'Paris',
      lat_ne: 48.86471476180278,
      lat_sw: 48.83579746243092,
      lon_ne: 2.373046875,
      lon_sw: 2.3291015625,
      temperature: '',
      humidity: '',
      pressure: '',
    },
    {
      city: 'New York',
      lat_ne: 40.97989806962013,
      lat_sw: 38.82259097617712,
      lon_ne: -81.5625,
      lon_sw: -81.5625,
      temperature: '',
      humidity: '',
      pressure: '',
    },
    {
      city: 'Berlin',
      lat_ne: 52.3755991766591,
      lat_sw: 52.26815737376817,
      lon_ne: 13.7109375,
      lon_sw: 13.53515625,
      temperature: '',
      humidity: '',
      pressure: '',
    },
    {
      city: 'Dublin',
      lat_ne: 53.349765,
      lat_sw: 53,
      lon_ne: 6,
      lon_sw: -6.260273,
      temperature: '',
      humidity: '',
      pressure: '',
    },
  ],
  selectableCityList: ['Paris', 'New York', 'Berlin', 'Dublin'],
  selectedCities: [],
  selectedMeasurType: {
    colorClass: 'bg-amber-500',
    iconName: 'temperature',
    title: 'Temperature',
    value: 'temperature',
  },
})

export const getters = {
  getDefaultCities: (state) => state.defaultCities,
  getSelectableCityList: (state) => state.selectableCityList,
  getSelectedCities: (state) => state.selectedCities,
  getSelectedMeasureType: (state) => state.selectedMeasurType,
}

export const mutations = {
  SET_SELECTED_CITIES(state, res) {
    state.selectedCities = res
  },
  SET_SELECTED_MEASURE_TYPE(state, res) {
    state.selectedMeasurType = res
  },
}

export const actions = {
  setSelectedCities({ commit }, cities) {
    commit('SET_SELECTED_CITIES', cities)
  },
  setSelectedMeasureType({ commit }, measureType) {
    commit('SET_SELECTED_MEASURE_TYPE', measureType)
  },
  async fetchCityWeather({ state, commit }, params) {
    try {
      let selectedCitiesWithWeatherInfo = cloneDeep(state.selectedCities)
      selectedCitiesWithWeatherInfo = await Promise.all(
        selectedCitiesWithWeatherInfo.map(async (city) => {
          const location = {
            lat_ne: city.lat_ne,
            lat_sw: city.lat_sw,
            lon_ne: city.lon_ne,
            lon_sw: city.lon_sw,
          }
          const res = await this.$weatherService().getPublicData(
            params.token,
            location,
            state.selectedMeasurType.value,
            'false'
          )
          const data = await res.body
          // Todo: the data returned from the API is quite messy here. For example, when required_type='rain',
          // there will be temperature, humodity, pressure data too
          // Check if there is a easier way to extract the data needed
          if (state.selectedMeasurType.value === 'temperature') {
            const measuresTandH = Object.values(data.shift().measures)[0]
            const measuresNumbersTandH = Object.values(measuresTandH)[0]
            const temperature = Object.values(measuresNumbersTandH)[0][0]
            const humidity = Object.values(measuresNumbersTandH)[0][1]
            const measuresP = Object.values(data.shift().measures)[1]
            const measuresNumbersP = measuresP.res
            const pressure = Object.values(measuresNumbersP)[0][0]
            city.temperature = temperature
            city.humidity = humidity
            city.pressure = pressure
          }
          if (state.selectedMeasurType.value === 'rain') {
            const measureRain = Object.values(data.shift().measures)[2]
            city.rain_24h = measureRain.rain_24h
            city.rain_60min = measureRain.rain_60min
            city.rain_live = measureRain.rain_live
            city.rain_timeutc = measureRain.rain_timeutc
          }
          if (state.selectedMeasurType.value === 'wind') {
            const measureRain = Object.values(data.shift().measures)[3]
            city.gust_angle = measureRain.gust_angle
            city.gust_strength = measureRain.gust_strength
            city.wind_angle = measureRain.wind_angle
            city.wind_strength = measureRain.wind_strength
            city.wind_timeutc = measureRain.wind_timeutc
          }
          return city
        })
      )
      commit('SET_SELECTED_CITIES', selectedCitiesWithWeatherInfo)
    } catch (err) {}
  },
}
