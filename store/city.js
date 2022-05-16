
export const state = () => ({
  selectedCities: []
})

export const getters = {
  selectedCities: state => state.selectedCities
}

export const mutations = {
  SET_SELECTED_CITIES(state, res) {
    state.selectedCities = res
  }
}

export const actions = {
  setSelectedCities({ commit }, cities) {
    commit('SET_SELECTED_CITIES', cities)
  }
}
