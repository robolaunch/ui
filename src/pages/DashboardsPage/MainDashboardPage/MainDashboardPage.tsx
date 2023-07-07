import React, { ReactElement, useEffect, useMemo, useState } from "react";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import { organizationNameViewer } from "../../../helpers/GeneralFunctions";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import InfoCell from "../../../components/Cells/InfoCell";
import useFunctions from "../../../hooks/useFunctions";
import Button from "../../../components/Button/Button";
import useSidebar from "../../../hooks/useSidebar";
import { useParams } from "react-router-dom";
import OrganizationActionCells from "../../../components/ActionCells/OrganizationActionCells";
import StateCell from "../../../components/Cells/StateCell";

export default function MainDashboardPage(): ReactElement {
  const [responseOrganizations, setResponseOrganizations] = useState<
    any[] | undefined
  >();
  const { getOrganizations } = useFunctions();
  const [reload, setReload] = useState<boolean>(false);
  const { setSidebarState } = useSidebar();
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
              })}
              subtitle={`${organizationNameViewer({
                organizationName: rowData?.name?.organizationName,
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
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 grid-cols-12">
        <div className="col-span-12 lg:col-span-4">
          <InformationWidget
            title={`Main Dashboard`}
            subtitle="This page is the main page of the platform. On this page, you can manage your existing organizations, rename them, delete them, or view the details of each organization. If you need to create a new organization, you can click the button below to create a organization."
            component={
              <Button
                text="Create a new Organization"
                className="!w-48 !h-10 !text-xs"
                onClick={() => {
                  setSidebarState((prevState: any): any => ({
                    ...prevState,
                    isOpen: true,
                    isCreateMode: false,
                    page: "organization",
                  }));
                }}
              />
            }
          />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <UtilizationWidget title="Account" />
        </div>
        <div className="hidden lg:block lg:col-span-3">
          <CountWidget
            data={{
              series: [responseOrganizations?.length || 0, 0, 0],
              categories: [["Ready"], ["Pending"], ["Error"]],
            }}
            title="Account"
          />
        </div>
      </div>
      <div className="grid grid-cols-1">
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
      </div>
    </div>
  );
}
