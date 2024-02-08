import {
  IFleet,
  IFleetBE,
  IPhysicalFleetBE,
} from "../interfaces/global/fleet.interface";

function handleMapper(
  vFleets: IFleetBE[],
  pFleets?: IPhysicalFleetBE[],
): IFleet[] {
  return (
    vFleets?.map((vFleet) => {
      return {
        name: vFleet.name,
        status: vFleet.fleetStatus,
        physicalStatus:
          pFleets?.find((pFleet) => pFleet.fleetName === vFleet.name)
            ?.fleetStatus || null,
      };
    }) || []
  );
}

export function fleetsMapper(
  vFleets: IFleetBE[],
  pFleets: IPhysicalFleetBE[],
): IFleet[] {
  return handleMapper(vFleets, pFleets);
}

export function fleetMapper(
  vfleets: IFleetBE[],
  pFleets: IPhysicalFleetBE[],
  filter: string,
): null | IFleet {
  return (
    handleMapper(vfleets, pFleets).find((fleet) => fleet.name === filter) ||
    null
  );
}
