/* eslint-disable camelcase */
export interface City {
  name: string
  lat_ne: number
  lat_sw: number
  lon_ne: number
  lon_sw: number
  temperature: number
}

export interface Weather {
	temperature: number
  humidity: number
  pressure: number
}
