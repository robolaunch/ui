import { ReactElement } from "react";
import { IOrganization } from "./organizationInterfaces";
import { IInstance } from "./instanceInferfaces";

export interface IMainDashboardData {
  key: string;
  name: string;
  status: string;
  actions: IOrganization;
}

export interface IMainDashboardColumn {
  key: string;
  header: string;
  align: string;
  sortable?: false;
  filter?: false;
  body: (rowData: IMainDashboardData) => ReactElement;
}

export interface IOrganizationDashboardData {
  key: string;
  name: {
    name: string;
    organization: string;
    titleURL: string;
  };
  organization: string;
  region: string;
  country: string;
  state: string;
  actions: any;
}

export interface IOrganizationDashboardColumn {
  key: string;
  header: string;
  sortable?: boolean;
  filter?: boolean;
  align: string;
  body?: (rowData: any) => ReactElement;
}

export interface IInstanceDashboardUsages {
  cpu: {
    title: string;
    core: number;
    percentage: number;
  };
  gpu: {
    title: string;
    core: number;
    percentage: number;
  };
  memory: {
    title: string;
    size: number;
    percentage: number;
  };
  storage: {
    title: string;
    size: number;
    percentage: number;
  };
  network: {
    title: string;
    in: number;
    out: number;
  };
}

export interface IInstanceDashboardData {
  key: string;
  name: {
    title: string;
    subtitle: string;
    titleURL: string;
  };
  organization: string;
  architecture: string;
  OSResources: string;
  kernel: string;
  k8s: string;
  usages: IInstanceDashboardUsages;
  providerState: string;
  robolaunchState: string;
  actions: IInstance;
}
