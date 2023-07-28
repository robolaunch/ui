import React, { Fragment, ReactElement, useEffect, useState } from "react";
import StateCell from "../Cells/StateCell";
import Seperator from "../Seperator/Seperator";
import useGeneral from "../../hooks/useGeneral";

interface ITrialStateViewer {
  responseOrganization?: any;
  responseRoboticsCloud?: any;
  responseInstance?: any;
  responseFleet?: any;
  handleCloseModal?: () => void;
}

export default function TrialStateViewer({
  responseOrganization,
  responseRoboticsCloud,
  responseInstance,
  responseFleet,
  handleCloseModal,
}: ITrialStateViewer): ReactElement {
  const [states, setStates] = useState<any>();

  useEffect(() => {
    setStates([
      {
        name: "organization",
        path: "organization",
        state:
          responseOrganization === null
            ? "None"
            : responseOrganization === undefined
            ? "Pending"
            : "Ready",
        success: responseOrganization ? true : false,
      },
      {
        name: "robotics cloud",
        path: "roboticscloud",
        state:
          responseRoboticsCloud === null
            ? "None"
            : responseRoboticsCloud === undefined
            ? "Pending"
            : "Ready",
        success: responseRoboticsCloud ? true : false,
      },
      {
        name: "cloud instance",
        path: "instance",
        state:
          responseInstance === null
            ? "None"
            : responseInstance === undefined
            ? "Pending"
            : responseInstance?.instanceCloudState === "ConnectionHub_Ready"
            ? "Ready"
            : "Creating",
        success:
          responseInstance?.instanceCloudState === "ConnectionHub_Ready"
            ? true
            : false,
      },
      {
        name: "fleet",
        path: "fleet",
        state:
          responseFleet === null
            ? "None"
            : responseFleet === undefined
            ? "Pending"
            : responseFleet?.fleetStatus === "Ready"
            ? "Ready"
            : "Creating",
      },
    ]);
  }, [
    responseOrganization,
    responseRoboticsCloud,
    responseInstance,
    responseFleet,
  ]);

  const { setSidebarState } = useGeneral();

  function handleRedirectSidebar() {
    if (responseOrganization === null) {
      setSidebarState((prevState: any) => ({
        ...prevState,
        page: "organization",
        isOpen: true,
      }));
    } else if (responseRoboticsCloud === null) {
      setSidebarState((prevState: any) => ({
        ...prevState,
        page: "roboticscloud",
        isOpen: true,
      }));
    } else if (responseInstance === null) {
      setSidebarState((prevState: any) => ({
        ...prevState,
        page: "instance",
        isOpen: true,
      }));
    } else if (responseFleet === null) {
      setSidebarState((prevState: any) => ({
        ...prevState,
        page: "fleet",
        isOpen: true,
      }));
    }

    handleCloseModal && handleCloseModal();
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      {states?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-2">
                <img
                  className="w-5 h-5"
                  src={`/svg/general/${item?.path}/${item?.path}-gray.svg`}
                  alt="robolaunch"
                />
                <span className="capitalize text-xs">{item?.name}</span>
              </div>
              <div className="flex items-center gap-4">
                {item?.state === "None" && (
                  <span
                    className="text-xs text-layer-dark-300 
                    cursor-pointer underline"
                    onClick={handleRedirectSidebar}
                  >
                    Create
                  </span>
                )}
                <StateCell
                  state={item?.success ? "Ready" : item?.state}
                  isRobolaunchState={
                    responseInstance?.instanceCloudState &&
                    item?.path === "instance"
                      ? true
                      : false
                  }
                />
              </div>
            </div>
            {index !== states?.length - 1 && <Seperator />}
          </Fragment>
        );
      })}
    </div>
  );
}
