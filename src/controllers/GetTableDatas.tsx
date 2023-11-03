import OrganizationActionCells from "../components/TableActionCells/OrganizationActionCells";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IOrganization } from "../interfaces/organizationInterfaces";
import StateCell from "../components/TableInformationCells/StateCell";
import {
  IMainDashboardColumn,
  IMainDashboardData,
  IOrganizationDashboardColumn,
  IOrganizationDashboardData,
} from "../interfaces/tableInterface";
import OrganizationInfoCell from "../components/OrganizationInfoCell/OrganizationInfoCell";
import RoboticsCloudActionCells from "../components/TableActionCells/RoboticsCloudActionCells";
import BasicCell from "../components/TableInformationCells/BasicCell";
import { stringCapitalization } from "../functions/GeneralFunctions";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { Params } from "react-router-dom";

interface IGetMainDashboardTableDatas {
  responseOrganizations: IOrganization[] | undefined;
  setReload: Dispatch<SetStateAction<boolean>>;
}

export function GetMainDashboardTableDatas({
  responseOrganizations,
  setReload,
}: IGetMainDashboardTableDatas) {
  const data: IMainDashboardData[] = useMemo(
    () =>
      responseOrganizations?.map((organization: IOrganization) => {
        return {
          key: organization?.organizationName,
          name: organization,
          state: undefined,
          actions: organization,
        };
      }) || [],
    [responseOrganizations],
  );

  const columns: IMainDashboardColumn[] = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: IMainDashboardData) => {
          return <OrganizationInfoCell rowData={rowData} />;
        },
      },
      {
        key: "state",
        header: "State",
        align: "left",
        body: () => {
          return <StateCell state="Ready" />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: IMainDashboardData) => {
          return (
            <OrganizationActionCells
              data={rowData?.actions}
              reload={() => setReload((prevState: boolean) => !prevState)}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return { data, columns };
}

interface IGetOrganizationDashboardTableDatas {
  responseRoboticsClouds: any;
  setReload: Dispatch<SetStateAction<boolean>>;
  url: Readonly<Params<string>>;
}

export function GetOrganizationDashboardTableDatas({
  responseRoboticsClouds,
  setReload,
  url,
}: IGetOrganizationDashboardTableDatas) {
  const data: IOrganizationDashboardData[] = useMemo(
    () =>
      responseRoboticsClouds?.map(
        (rc: { name: any; region: any; actions: any }) => {
          return {
            key: rc?.name,
            name: rc,
            organization: url?.organizationName,
            region: rc?.region,
            country:
              rc.region === "eu-central-1"
                ? "Frankfurt (Germany)"
                : rc?.region === "eu-west-2"
                ? "London (UK)"
                : rc?.region === "us-east-1"
                ? "N. Virginia (US)"
                : rc?.region === "us-east-2"
                ? "Ohio (US)"
                : rc?.region === "us-west-1"
                ? "N. California (US)"
                : rc?.region === "ap-northeast-1" && "Tokyo (Japan)",
            state: "Ready",
            users: rc?.actions,
          };
        },
      ),
    [url, responseRoboticsClouds],
  );

  const columns: IOrganizationDashboardColumn[] = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return (
            <InfoCell
              title={rowData?.name?.name}
              subtitle={`${url?.organizationName} Organization`}
              titleURL={`/${url?.organizationName}/${rowData?.name?.name}`}
            />
          );
        },
      },
      {
        key: "organization",
        header: "Organization",
        sortable: false,
        filter: false,
        align: "left",
        body: () => {
          return (
            <BasicCell
              text={stringCapitalization({
                str: url?.organizationName!,
              })}
            />
          );
        },
      },
      {
        key: "region",
        header: "Region",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.region} />;
        },
      },
      {
        key: "country",
        header: "Country",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <BasicCell text={rowData?.country} />;
        },
      },
      {
        key: "state",
        header: "State",
        sortable: false,
        filter: false,
        align: "left",
        body: (rowData: any) => {
          return <StateCell state={rowData?.state} />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: any) => {
          return (
            <RoboticsCloudActionCells
              data={rowData}
              reload={() => {
                setReload((prevState: boolean) => !prevState);
              }}
            />
          );
        },
      },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url?.organizationName],
  );

  return { data, columns };
}
