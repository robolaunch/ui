export interface IFleet {
  name: string;
  status: string;
  physicalStatus: string | null;
}

export interface IFleetBE {
  name: string;
  fleetStatus: string;
}

export interface IPhysicalFleetBE {
  fleetName: string;
  fleetStatus: string;
  name: string; // phy instance name
}
