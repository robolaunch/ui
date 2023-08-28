import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { organizationNameViewer } from "../../functions/GeneralFunctions";
import SidebarSelectInfo from "../SidebarInfo/SidebarInfo";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";
import StateCell from "../TableInformationCells/StateCell";
import useFunctions from "../../hooks/useFunctions";
import BasicCell from "../TableInformationCells/BasicCell";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";

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
  const { selectedState } = useMain();
  const { getRoboticsClouds } = useFunctions();

  useEffect(() => {
    if (selectedState?.organization) {
      setResponseRoboticsClouds(undefined);
      handleGetRoboticsClouds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  function handleGetRoboticsClouds() {
    getRoboticsClouds(
      {
        organizationId: selectedState?.organization?.organizationId!,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseRoboticsClouds,
        setItemCount: setItemCount,
      }
    );
  }

  return (
    <Fragment>
      {!selectedState?.organization ? (
        <SidebarSelectInfo text={`Select an Organization to view instances.`} />
      ) : (
        <Fragment>
          {!Array.isArray(responseRoboticsClouds) ? (
            <SidebarListLoader />
          ) : Array.isArray(responseRoboticsClouds) &&
            !responseRoboticsClouds?.length ? (
            <SidebarSelectInfo text={`Create a Region.`} />
          ) : (
            responseRoboticsClouds?.map((roboticsCloud: any, index: number) => {
              return (
                <SidebarListItem
                  key={index}
                  type="roboticscloud"
                  name={roboticsCloud?.name}
                  description={
                    <div className="flex gap-2">
                      <StateCell state={"Ready"} />
                      <BasicCell text={`Region: ${roboticsCloud?.region}`} />
                    </div>
                  }
                  url={`/${organizationNameViewer({
                    organizationName:
                      selectedState?.organization?.organizationName!,
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
