import { ICloudInstance } from "../global/cloudInstance.interface";
import { IOrganization } from "../global/organization.interface";
import { INamespace } from "../global/namespace.interface";
import { IRegion } from "../global/region.interface";
import { IFleet } from "../global/fleet.interface";

export interface ISidebarState {
  isOpen: boolean;
  isCreateMode: boolean;
  page:
    | "organization"
    | "roboticscloud"
    | "instance"
    | "fleet"
    | "robot"
    | "importmanager"
    | "workspacesmanager"
    | "buildsmanager"
    | "launchsmanager"
    | undefined;
  instanceTab: "Cloud Instances" | "Physical Instances";
}

export interface ISelectedState {
  organization: IOrganization | null;
  roboticsCloud: IRegion | null;
  instance: ICloudInstance | null;
  fleet: INamespace | IFleet | null;
}

export interface IpagesState {
  organization: IOrganization | null;
  roboticsCloud: IRegion | null;
  instance: ICloudInstance | null;
  fleet: INamespace | IFleet | null;
}
