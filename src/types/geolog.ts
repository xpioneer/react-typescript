export interface SystemLog {

  id: string

  request_ip: string

  request_url: string

  request_method: string

  request_params: string

  request_client: string

  client_type: string

  client_version: string

  host: string

  hostname: string

  origin: string

  path: string

  request_header: string

  protocol: string

  status: number

  time: number

  msg: string

  source: string

  continent_code: string

  continent_name_en: string

  continent_name_zh: string

  continent_geoname_id: number

  country_iso_code: string

  country_geoname_id: number

  country_name_en: string

  country_name_zh: string

  subdivisions_iso_code: string

  subdivisions_geoname_id: number

  subdivisions_name_en: string

  subdivisions_name_zh: string

  city_geoname_id: number

  city_name_en: string

  city_name_zh: string

  accuracy_radius: number

  latitude: string

  longitude: string

  metro_code: number

  time_zone: string

  created_by: string

  created_at: number

  updated_by: string

  updated_at: number

  deleted_by: string

  deleted_at: number

  version: number

}