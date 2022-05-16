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
  selectedCities: [],
})

export const getters = {
  getDefaultCities: (state) => state.defaultCities,
  selectedCities: (state) => state.selectedCities,
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
}
