import Vue from 'vue'
import AuthService from '~/services/auth/authService'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $authService(): AuthService
  }
}
