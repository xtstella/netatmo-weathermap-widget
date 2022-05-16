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
    }
  ],
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
    }
  ],
})

export const getters = {
  getDefaultCities: (state) => state.defaultCities,
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
      const results = await  this.$weatherService().getPublicData(
        params.token,
        params.location,
        params.requiredData,
        params.ifFilter
      )
      commit(
        'SET_ENTITIES',
        results.filter(industry => industry.name !== 'NONE')
      )
    } catch (err) {
      // TO DO : what to do if we can't fetch this ?
    }
  },
}
