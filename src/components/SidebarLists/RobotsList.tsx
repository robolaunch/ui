import { IEnvironment } from "../../interfaces/environment/environment.interface";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import { Fragment, ReactElement, useEffect, useState } from "react";
import StateCell from "../TableInformationCells/StateCell";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";

interface IRobotsList {
  reload: boolean;
  setItemCount: any;
}

export default function RobotsList({
  reload,
  setItemCount,
}: IRobotsList): ReactElement {
  const [responseRobots, setResponseRobots] = useState<IEnvironment[] | null>(
    null,
  );
  const { selectedState, applicationMode } = useMain();
  const { getRobots } = useFunctions();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance &&
        selectedState?.fleet
      ) {
        setResponseRobots(null);
        handleGetRobots();
      }

      const timer = setInterval(() => {
        selectedState?.organization &&
          selectedState?.roboticsCloud &&
          selectedState?.instance &&
          selectedState?.fleet &&
          handleGetRobots();
      }, 10000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reload],
  );

  function handleGetRobots() {
    getRobots(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name!,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseRobots,
        setItemCount: setItemCount,
      },
    );
  }

  return (
    <Fragment>
      {!selectedState?.organization ||
      !selectedState?.roboticsCloud ||
      !selectedState?.instance ||
      !selectedState?.fleet ? (
        <SidebarInfo
          text={`Select an ${
            !selectedState?.organization
              ? "Organization"
              : !selectedState?.roboticsCloud
                ? "Robotics Cloud"
                : !selectedState?.instance
                  ? "Instance"
                  : "Fleet"
          } to view ${applicationMode ? "applications" : "robots"}.`}
        />
      ) : !Array.isArray(responseRobots) ? (
        <SidebarListLoader />
      ) : responseRobots?.length === 0 ? (
        <SidebarInfo text={`Create a Robot.`} />
      ) : (
        <Fragment>
          {responseRobots?.map((robot, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="robot"
                name={robot?.step1?.details?.name}
                description={
                  <div className="flex gap-2">
                    <div className="flex gap-1.5">
                      <span className="font-medium">Virtual:</span>
                      <StateCell
                        state={robot?.step1?.clusters?.environment?.[0]?.status}
                      />
                    </div>
                    {robot?.step1?.clusters?.environment?.[1]?.status && (
                      <div className="flex gap-1.5">
                        <span className="font-medium">Virtual:</span>
                        <StateCell
                          state={
                            robot?.step1?.clusters?.environment?.[0]?.status
                          }
                        />
                      </div>
                    )}
                  </div>
                }
                url={robot?.step1?.details?.name}
                data={robot}
                notSelectable
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
