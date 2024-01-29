import { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import StateCell from "../TableInformationCells/StateCell";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";
import { IEnvironment } from "../../interfaces/environment/environment.interface";

interface IEnvironmentsList {
  reload: boolean;
  setItemCount: any;
}

export default function EnvironmentsList({
  reload,
  setItemCount,
}: IEnvironmentsList): ReactElement {
  const [responseEnvironments, setResponseEnvironments] = useState<
    IEnvironment[] | undefined
  >(undefined);
  const { selectedState } = useMain();
  const { getEnvironments } = useFunctions();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance &&
        selectedState?.fleet
      ) {
        setResponseEnvironments(undefined);
        handleGetEnvironments();
      }

      const timer = setInterval(() => {
        selectedState?.organization &&
          selectedState?.roboticsCloud &&
          selectedState?.instance &&
          selectedState?.fleet &&
          handleGetEnvironments();
      }, 10000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reload],
  );

  function handleGetEnvironments() {
    getEnvironments(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name!,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseEnvironments,
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
          } to view applications.`}
        />
      ) : !Array.isArray(responseEnvironments) ? (
        <SidebarListLoader />
      ) : responseEnvironments?.length === 0 ? (
        <SidebarInfo text={`Create a Application.`} />
      ) : (
        <Fragment>
          {responseEnvironments?.map((environment, index: number) => {
            console.log("environment", environment);

            return (
              <SidebarListItem
                key={index}
                type="robot"
                name={environment?.step1?.details?.name}
                description={
                  <div className="flex gap-2">
                    <div className="flex gap-1.5">
                      <span className="font-medium">Virtual:</span>
                      <StateCell
                        state={
                          Array.isArray(
                            environment?.step1?.clusters?.environment,
                          ) &&
                          environment?.step1?.clusters?.environment?.[0]
                            ?.status === "EnvironmentReady"
                            ? "Ready"
                            : environment?.step1?.clusters?.environment?.[0]
                                ?.status
                        }
                      />
                    </div>
                    {Array.isArray(environment?.step1?.clusters?.environment) &&
                      environment?.step1?.clusters?.environment.length > 1 && (
                        <div className="flex gap-1.5">
                          <span className="font-medium">Physical:</span>
                          <StateCell
                            state={
                              Array.isArray(
                                environment?.step1?.clusters?.environment,
                              ) &&
                              environment?.step1?.clusters?.environment?.[1]
                                ?.status === "EnvironmentReady"
                                ? "Ready"
                                : environment?.step1?.clusters?.environment?.[1]
                                    ?.status
                            }
                          />
                        </div>
                      )}
                  </div>
                }
                url={environment?.step1?.details?.name}
                data={environment}
                notSelectable
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
