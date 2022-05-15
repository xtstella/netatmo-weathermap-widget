import { Plugin } from '@nuxt/types'
import AuthService from '~/services/auth/authService'
import WeatherService from '~/services/weather/weatherService'

const locator: Plugin = (context, inject) => {
  inject('authService', () => new AuthService(context.$axios))
  inject('weatherService', () => new WeatherService(context.$axios))
}

export default locator
