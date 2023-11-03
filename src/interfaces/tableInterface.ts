import { ReactElement } from "react";
import { IOrganization } from "./organizationInterfaces";

export interface IMainDashboardData {
  key: string;
  name: IOrganization;
  state: undefined;
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
  key: string | undefined;
  name: any;
  organization: string | undefined;
  region: string | undefined;
  country: string | undefined;
  state: string | undefined;
  users: any;
}

export interface IOrganizationDashboardColumn {
  key: string;
  header: string;
  sortable?: boolean;
  filter?: boolean;
  align: string;
  body?: (rowData: any) => ReactElement;
}
