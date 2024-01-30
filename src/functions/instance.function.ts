import regionsAWS from "../constants/regions.json";

export function getRegionFromProviderCode(country_code: string): string {
  return regionsAWS.find((region) => region.country_code === country_code)
    ?.region_name!;
}
