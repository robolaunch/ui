import {
  IOrganizationDashboardColumn,
  IOrganizationDashboardData,
} from "../interfaces/tableInterface";
import RoboticsCloudActionCells from "../components/TableActionCells/RoboticsCloudActionCells";
import { handleSplitOrganizationName } from "../functions/GeneralFunctions";
import StateCell from "../components/TableInformationCells/StateCell";
import BasicCell from "../components/TableInformationCells/BasicCell";
import InfoCell from "../components/TableInformationCells/InfoCell";
import { Dispatch, SetStateAction, useMemo } from "react";
import useMain from "../hooks/useMain";

interface IOrgTableData {
  responseRoboticsClouds: any;
  setReload: Dispatch<SetStateAction<boolean>>;
}

export function OrgTableData({
  responseRoboticsClouds,
  setReload,
}: IOrgTableData) {
  const { pagesState } = useMain();

  const data: IOrganizationDashboardData[] = useMemo(
    () =>
      responseRoboticsClouds?.map(
        (rc: { name: string; region: any; actions: any }) => {
          return {
            key: rc?.name,
            name: rc,
            organization: handleSplitOrganizationName(
              pagesState?.organization?.organizationName!,
            ),
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
    [pagesState, responseRoboticsClouds],
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
              subtitle={`${handleSplitOrganizationName(
                pagesState?.organization?.organizationName!,
              )} Organization`}
              titleURL={`/${handleSplitOrganizationName(
                pagesState?.organization?.organizationName!,
              )}/${rowData?.name?.name}`}
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
              text={handleSplitOrganizationName(
                pagesState?.organization?.organizationName!,
              )}
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
    [pagesState, responseRoboticsClouds],
  );

  return { data, columns };
}
