import { Plugin } from '@nuxt/types'
import AuthService from '~/services/auth/authService'

const locator: Plugin = (context, inject) => {
  inject('authService', () => new AuthService(context.$axios))
}

export default locator
