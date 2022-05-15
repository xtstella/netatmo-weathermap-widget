import qs from 'qs'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import AuthServiceInterface from './authService.interface'

class AuthService implements AuthServiceInterface {
  private $axios: NuxtAxiosInstance
  constructor($axios: NuxtAxiosInstance) {
    this.$axios = $axios
  }

  async getAcessToken(username: string, password: string): Promise<string> {
    const body = qs.stringify({
      grant_type: 'password',
      client_id: '6280d8ef51c3d25e2d2c4b76',
      client_secret: 'oI1ojT7K73UKIse2BEa0359dxuQ',
      username,
      password,
      scope: 'read_station',
    })
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    const { data } = await this.$axios.post(
      'https://api.netatmo.com/oauth2/token',
      body,
      { headers }
    )
    return data.access_token
  }
}

export default AuthService
