import React, {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import OrganizationActionCells from "../../../components/TableActionCells/OrganizationActionCells";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import { organizationNameViewer } from "../../../functions/GeneralFunctions";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import DashboardLayout from "../../../layouts/DashboardLayout";
import StateCell from "../../../components/TableInformationCells/StateCell";
import InfoCell from "../../../components/TableInformationCells/InfoCell";
import useFunctions from "../../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import TourGuide from "../../../components/TourGuide/TourGuide";
import { getGuideItem } from "../../../functions/handleGuide";

export default function MainDashboardPage(): ReactElement {
  const [responseOrganizations, setResponseOrganizations] = useState<
    any[] | undefined
  >();
  const { getOrganizations } = useFunctions();
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();

  useEffect(() => {
    getOrganizations({
      setResponse: setResponseOrganizations,
      ifErrorNavigateTo404: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, url]);

  const data: any = useMemo(
    () =>
      responseOrganizations?.map((organization: any) => {
        return {
          key: organization?.organizationName,
          name: organization,
          state: organization?.state,
          actions: organization,
        };
      }),
    [responseOrganizations]
  );

  const columns: any = useMemo(
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
              title={organizationNameViewer({
                organizationName: rowData?.name?.organizationName,
                capitalization: false,
              })}
              subtitle={`${organizationNameViewer({
                organizationName: rowData?.name?.organizationName,
                capitalization: false,
              })}`}
              titleURL={`/${organizationNameViewer({
                organizationName: rowData?.name?.organizationName,
                capitalization: false,
              })}`}
            />
          );
        },
      },
      {
        key: "state",
        header: "State",
        align: "left",
        body: (rowData: any) => {
          return <StateCell state="Ready" />;
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: any) => {
          return (
            <OrganizationActionCells
              data={rowData?.actions}
              reload={() => setReload(!reload)}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <DashboardLayout
      isMainDashboard
      widget1={
        <InformationWidget
          title={`Main Dashboard`}
          subtitle="This page is the main page of the platform. On this page, you can manage your existing organizations, rename them, delete them, or view the details of each organization. "
          component={
            <TourGuide
              type="main"
              tourConfig={[
                getGuideItem('[data-tut="organization-sidebar-menu-item"]'),
                getGuideItem('[data-tut="roboticscloud-sidebar-menu-item"]'),
                getGuideItem('[data-tut="instance-sidebar-menu-item"]'),
                getGuideItem('[data-tut="fleet-sidebar-menu-item"]'),
                getGuideItem('[data-tut="robot-sidebar-menu-item"]'),
                getGuideItem('[data-tut="information-widget"]'),
                getGuideItem('[data-tut="counter-widget"]'),
                getGuideItem('[data-tut="general-table"]'),
              ]}
            />
          }
        />
      }
      widget3={
        <Fragment>
          <CountWidget
            data={
              responseOrganizations
                ? [
                    {
                      label: "Pending",
                      value: 0,
                      color: "#ffa500",
                    },
                    {
                      label: "Ready",
                      value: responseOrganizations?.length || 0,
                      color: "#AC2DFE99",
                    },
                    {
                      label: "Error",
                      value: 0,
                      color: "#ff0000",
                    },
                  ]
                : []
            }
          />
        </Fragment>
      }
      table={
        <GeneralTable
          type="organization"
          title="Organizations"
          data={data}
          columns={columns}
          loading={Array.isArray(responseOrganizations) ? false : true}
          handleReload={() => {
            setResponseOrganizations(undefined);
            setReload(!reload);
          }}
        />
      }
    />
  );
}
