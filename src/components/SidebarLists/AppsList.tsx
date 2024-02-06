import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import { IEnvironmentStep2 } from "../../interfaces/environment/environment.step2.interface";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import { Fragment, ReactElement, useEffect, useState } from "react";
import StateCell from "../TableInformationCells/StateCell";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";

interface IAppsList {
  reload: boolean;
}

export default function AppsList({ reload }: IAppsList): ReactElement {
  const [apps, setApps] = useState<
    | {
        step1: IEnvironmentStep1;
        step2: IEnvironmentStep2;
      }[]
    | undefined
  >(undefined);
  const { selectedState } = useMain();
  const { getApplicationsFC } = useFunctions();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance &&
        selectedState?.fleet
      ) {
        setApps(undefined);
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

  async function handleGetEnvironments() {
    setApps(await getApplicationsFC(false, false));
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
      ) : !Array.isArray(apps) ? (
        <SidebarListLoader />
      ) : apps?.length === 0 ? (
        <SidebarInfo text={`Create a Application.`} />
      ) : (
        <Fragment>
          {apps?.map((environment, index: number) => {
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
