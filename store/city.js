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
      city: 'Bogota',
      lat_ne: 5.266007882805492,
      lat_sw: 4.915832801313174,
      lon_ne: -75.234375,
      lon_sw: -75.5859375,
      temperature: '',
      humidity: '',
      pressure: '',
    },
  ],
  selectableCityList: ['Paris', 'New York', 'Berlin', 'Bogota'],
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
  async fetchCityWeather({ commit }, params) {
    try {
      const results = await this.$weatherService().getPublicData(
        params.token,
        params.location,
        params.requiredData,
        params.ifFilter
      )
      commit(
        'SET_ENTITIES',
        results.filter((industry) => industry.name !== 'NONE')
      )
    } catch (err) {
      // TO DO : what to do if we can't fetch this ?
    }
  },
}
