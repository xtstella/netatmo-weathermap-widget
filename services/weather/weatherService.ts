import { NuxtAxiosInstance } from '@nuxtjs/axios'
import WeatherServiceInterface from './weatherService.interface'
import { Location } from "~/types/location";

class WeatherService implements WeatherServiceInterface {
  private $axios: NuxtAxiosInstance
  constructor($axios: NuxtAxiosInstance) {
    this.$axios = $axios
  }

  async getPublicData(
    accessToken: string,
    locationParams: Location,
    requiredData: String,
    ifFilter: String
  ): Promise<any> {
    const headers = { Authorization: `Bearer ${accessToken}` }
    const params = {
      lat_ne: locationParams.lat_ne,
      lat_sw: locationParams.lat_sw,
      lon_ne: locationParams.lon_ne,
      lon_sw: locationParams.lon_sw,
      required_data: requiredData,
      filter: ifFilter
    }
    const res = await this.$axios.get(
      'https://api.netatmo.com/api/getpublicdata',
      { headers, params }
    )
    return res
  }
}

export default WeatherService
