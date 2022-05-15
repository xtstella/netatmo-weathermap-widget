export default interface WeatherServiceInterface {
  getPublicData(
    accessToken: string,
    locationParams: Object,
    requiredData: String,
    ifFilter: String
  ): Promise<any>
}
