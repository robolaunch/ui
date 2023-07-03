import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarInstancesTabs from "../SidebarInstancesTabs/SidebarInstancesTabs";
import organizationNameViewer from "../../helpers/organizationNameViewer";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useSidebar from "../../hooks/useSidebar";
import StateCell from "../Cells/StateCell";

interface ICloudInstancesList {
  reload: boolean;
  setItemCount: any;
}

export default function CloudInstancesList({
  reload,
  setItemCount,
}: ICloudInstancesList): ReactElement {
  const [responseInstances, setResponseInstances] = useState<any[] | undefined>(
    undefined
  );
  const { selectedState } = useSidebar();
  const { getInstances } = useFunctions();

  useEffect(
    () => {
      if (selectedState?.organization && selectedState?.roboticsCloud) {
        setResponseInstances(undefined);
        handleGetCloudInstances();
      }

      const timer = setInterval(() => {
        selectedState?.organization &&
          selectedState?.roboticsCloud &&
          handleGetCloudInstances();
      }, 20000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reload]
  );

  function handleGetCloudInstances() {
    getInstances(
      {
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        region: selectedState?.roboticsCloud?.region,
      },
      {
        setResponse: setResponseInstances,
        ifErrorNavigateTo404: !responseInstances,
        setItemCount: setItemCount,
      }
    );
  }

  return (
    <Fragment>
      <SidebarInstancesTabs />
      {!selectedState?.organization || !selectedState?.roboticsCloud ? (
        <SidebarInfo
          text={`Select an ${
            !selectedState?.organization ? "Organization" : "Robotics Cloud"
          } to view instances.`}
        />
      ) : !Array.isArray(responseInstances) ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : responseInstances.length === 0 ? (
        <SidebarInfo text={`Create an Cloud Instances.`} />
      ) : (
        <Fragment>
          {responseInstances?.map((instance: any, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="instance"
                name={instance?.name}
                description={
                  <div className="flex gap-2">
                    <div className="flex gap-1.5">
                      <span className="font-medium">RS:</span>
                      <StateCell
                        state={instance?.instanceCloudState}
                        isRobolaunchState
                      />
                    </div>
                    <div className="flex gap-1.5">
                      <span className="font-medium">PS:</span>
                      <StateCell state={instance?.instanceState} />
                    </div>
                  </div>
                }
                url={`/${organizationNameViewer({
                  organizationName:
                    selectedState?.organization?.organizationName,
                  capitalization: false,
                })}/${selectedState?.roboticsCloud?.name}/${instance?.name}`}
                data={instance}
                selected={instance?.name === selectedState?.instance?.name}
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
