import React, { Fragment, ReactElement, useEffect, useState } from "react";
import organizationNameViewer from "../../helpers/organizationNameViewer";
import SidebarSelectInfo from "../SidebarInfo/SidebarInfo";
import SidebarListItem from "./SidebarListItem";
import useSidebar from "../../hooks/useSidebar";
import StateCell from "../Cells/StateCell";
import useFunctions from "../../hooks/useFunctions";

interface IRoboticsCloudsList {
  reload: boolean;
  setItemCount: any;
}

export default function RoboticsCloudsList({
  reload,
  setItemCount,
}: IRoboticsCloudsList): ReactElement {
  const [responseRoboticsClouds, setResponseRoboticsClouds] = useState<
    any[] | undefined
  >(undefined);
  const { selectedState } = useSidebar();
  const { getRoboticsClouds } = useFunctions();

  useEffect(() => {
    if (selectedState?.organization) {
      handleGetRoboticsClouds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  function handleGetRoboticsClouds() {
    setResponseRoboticsClouds(undefined);
    getRoboticsClouds(
      {
        organizationId: selectedState?.organization?.organizationId,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseRoboticsClouds,
      }
    );
    setItemCount(responseRoboticsClouds?.length);
  }

  return (
    <Fragment>
      {!selectedState?.organization ? (
        <SidebarSelectInfo text={`Select an Organization to view instances.`} />
      ) : (
        <Fragment>
          {!Array.isArray(responseRoboticsClouds) ? (
            <img
              className="w-12 mx-auto pt-10"
              src="/svg/general/loading.svg"
              alt="Loading..."
            />
          ) : Array.isArray(responseRoboticsClouds) &&
            !responseRoboticsClouds?.length ? (
            <SidebarSelectInfo text={`Create a Robotics Cloud`} />
          ) : (
            responseRoboticsClouds?.map((roboticsCloud: any, index: number) => {
              return (
                <SidebarListItem
                  key={index}
                  type="roboticscloud"
                  name={roboticsCloud?.name}
                  description={<StateCell state={"Ready"} />}
                  url={`/${organizationNameViewer({
                    organizationName:
                      selectedState?.organization?.organizationName,
                    capitalization: false,
                  })}/${roboticsCloud?.name}`}
                  data={roboticsCloud}
                  selected={
                    roboticsCloud?.name === selectedState?.roboticsCloud?.name
                  }
                />
              );
            })
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
