import React, {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import stringCapitalization from "../../../helpers/stringCapitalization";
import CountWidget from "../../../components/CountWidget/CountWidget";
import GeneralTable from "../../../components/Table/GeneralTable";
import BasicCell from "../../../components/Cells/BasicCell";
import { useParams } from "react-router-dom";
import InfoCell from "../../../components/Cells/InfoCell";
import Button from "../../../components/Button/Button";
import useSidebar from "../../../hooks/useSidebar";
import useFunctions from "../../../hooks/useFunctions";

export default function OrganizationDashboardPage(): ReactElement {
  const {
    handleSetterCurrentOrganization,
    handleSetterResponseRoboticsClouds,
  } = useFunctions();
  const { selectedState, setSidebarState } = useSidebar();
  const [responseRoboticsClouds, setResponseRoboticsClouds] =
    useState<any>(undefined);
  const [reload, setReload] = useState<boolean>(false);
  const url = useParams();

  useEffect(() => {
    setResponseRoboticsClouds(undefined);
    if (!selectedState?.organization) {
      handleSetterCurrentOrganization(url?.organizationName);
    } else {
      handleSetterResponseRoboticsClouds(setResponseRoboticsClouds);
    }

    const timer =
      selectedState?.organization &&
      setInterval(() => {
        handleSetterResponseRoboticsClouds(setResponseRoboticsClouds);
      }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, url, selectedState]);

  const data: any = useMemo(
    () =>
      responseRoboticsClouds?.map((team: any) => {
        return {
          key: team?.name,
          name: team,
          organization: url?.organizationName,
          users: team?.users,
        };
      }),
    [url, responseRoboticsClouds]
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
              title={rowData?.name?.name}
              subtitle={`${stringCapitalization({
                str: url?.organizationName as string,
              })} Organization`}
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
        body: (rowData: any) => {
          return (
            <BasicCell
              text={stringCapitalization({
                str: url?.organizationName as string,
              })}
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
    [url]
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 grid-cols-12">
        <div className="col-span-12 lg:col-span-4">
          <InformationWidget
            title={
              stringCapitalization({
                str: url?.organizationName as string,
              }) || ""
            }
            subtitle="
             From this page you get information or you can manage the Robotics Clouds of your organization.
            "
            actiontitle="If you need to create organization you can proceed here."
            component={
              <Button
                text="Create a new Robotics Cloud"
                className="!w-56 !h-10 !text-xs"
                onClick={() => {
                  setSidebarState((prevState: any): any => ({
                    ...prevState,
                    isOpen: true,
                    isCreateMode: false,
                    page: "roboticscloud",
                  }));
                }}
              />
            }
          />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <UtilizationWidget
            title={`${stringCapitalization({
              str: url?.organizationName as string,
            })} Organization`}
          />
        </div>
        <div className="hidden lg:block lg:col-span-3">
          <CountWidget
            data={{
              series: [responseRoboticsClouds?.length || 0],
              categories: ["Robotics Clouds"],
            }}
            title={`${stringCapitalization({
              str: url?.organizationName as string,
            })} Organization`}
          />
        </div>
      </div>
      <div className="grid grid-cols-1">
        <GeneralTable
          type="roboticscloud"
          title="Robotics Clouds"
          data={data}
          columns={columns}
          loading={responseRoboticsClouds?.length ? false : true}
          handleReload={() => {
            setResponseRoboticsClouds(undefined);
            setReload(!reload);
          }}
        />
      </div>
    </div>
  );
}
