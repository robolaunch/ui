import React, { ReactElement, useEffect, useMemo, useState } from "react";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import organizationNameViewer from "../../../helpers/organizationNameViewer";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import InfoCell from "../../../components/Cells/InfoCell";
import useFunctions from "../../../hooks/useFunctions";
import Button from "../../../components/Button/Button";
import useSidebar from "../../../hooks/useSidebar";

export default function MainDashboardPage(): ReactElement {
  const [responseOrganizations, setResponseOrganizations] = useState<
    any[] | undefined
  >();
  const { handleSetterResponseOrganizations } = useFunctions();
  const [reload, setReload] = useState<boolean>(false);
  const { setSidebarState } = useSidebar();

  useEffect(() => {
    handleSetterResponseOrganizations(setResponseOrganizations);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const timer = setInterval(() => {
      handleSetterResponseOrganizations(setResponseOrganizations);
    }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const data: any = useMemo(
    () =>
      responseOrganizations?.map((organization: any) => {
        return {
          key: organization?.organizationName,
          name: organization,
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
        key: "actions",
        header: "Actions",
        align: "right",
        body: (rowData: any) => {
          return <></>;
        },
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 grid-cols-12">
        <div className="col-span-12 lg:col-span-4">
          <InformationWidget
            title={`Main Dashboard`}
            subtitle="From this page, you can view, control or get information about all
            the details of your organization."
            actiontitle="If you need to create a new organization you can proceed here."
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
              series: [responseOrganizations?.length || 0],
              categories: [["Organizations"]],
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
