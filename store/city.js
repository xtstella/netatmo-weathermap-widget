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
  selectedCities: [
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
  ],
})

export const getters = {
  getDefaultCities: (state) => state.defaultCities,
  getSelectableCityList: (state) => state.selectableCityList,
  getSelectedCities: (state) => state.selectedCities,
}

export const mutations = {
  SET_SELECTED_CITIES(state, res) {
    state.selectedCities = res
  },
}

export const actions = {
  setSelectedCities({ commit }, cities) {
    commit('SET_SELECTED_CITIES', cities)
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
            params.requiredData,
            params.ifFilter
          )
          const data = await res.body
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
          return city
        })
      )
      commit('SET_SELECTED_CITIES', selectedCitiesWithWeatherInfo)
    } catch (err) {}
  },
}
