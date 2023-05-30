import React, {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import GeneralTable from "../../../components/Table/GeneralTable";
import { useAppDispatch } from "../../../hooks/redux";
import InfoCell from "../../../components/Cells/InfoCell";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import CountWidget from "../../../components/CountWidget/CountWidget";
import Button from "../../../components/Button/Button";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import { useNavigate, useParams } from "react-router-dom";
import { getRoboticsCloudsOfOrganization } from "../../../resources/RoboticsCloudSlice";
import { getOrganizations } from "../../../resources/OrganizationSlice";
import BasicCell from "../../../components/Cells/BasicCell";
import stringCapitalization from "../../../helpers/stringCapitalization";
import useSidebar from "../../../hooks/useSidebar";
import { toast } from "sonner";

export default function OrganizationDashboardPage(): ReactElement {
  const { selectedState, setSidebarState } = useSidebar();
  const [currentOrganization, setCurrentOrganization] = useState<any>(
    selectedState?.organization || undefined
  );
  const [responseRoboticsClouds, setResponseRoboticsClouds] =
    useState<any>(undefined);
  const [reload, setReload] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const url = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentOrganization) {
      dispatch(getOrganizations()).then((responseOrganizations: any) => {
        if (
          responseOrganizations?.payload?.data?.filter(
            (organization: any) =>
              organization?.organizationName === `org_${url?.organizationName}`
          )[0]
        ) {
          setCurrentOrganization(
            responseOrganizations?.payload?.data?.filter(
              (organization: any) =>
                organization?.organizationName ===
                `org_${url?.organizationName}`
            )[0] || undefined
          );
        } else {
          toast.error(
            "The current page does not exist or is not available to you."
          );
          navigate("/404");
        }
      });
    } else {
      dispatch(
        getRoboticsCloudsOfOrganization({
          organizationId: currentOrganization?.organizationId,
        })
      ).then((response: any) => {
        if (response?.payload?.data[0]?.roboticsClouds) {
          setResponseRoboticsClouds(
            response?.payload?.data[0]?.roboticsClouds || []
          );
        } else {
          toast.error(
            "The current page does not exist or is not available to you."
          );
          navigate("/404");
        }
      });
    }
  }, [currentOrganization, dispatch, url?.organizationName, reload, navigate]);

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
            actiontitle="If you need to create a new team or check the users in the team you
            can proceed here."
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
          title="Robotics Cloud"
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
