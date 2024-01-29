import { IRegion, IRegionBE } from "../interfaces/region.interface";

function handleMapper(data: IRegionBE[]): IRegion[] {
  return (
    data?.map((item) => {
      return {
        name: item.name,
        provider: "aws",
        region: item.region,
      };
    }) || []
  );
}

export function regionsMapper(data: IRegionBE[]): IRegion[] {
  return handleMapper(data);
}

export function regionMapper(
  data: IRegionBE[],
  filter: string,
): null | IRegion {
  return handleMapper(data).find((item) => item.name === filter) || null;
}
