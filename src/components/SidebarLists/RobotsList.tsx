import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import { Fragment, ReactElement, useEffect, useState } from "react";
import StateCell from "../TableInformationCells/StateCell";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import { IEnvironmentStep2 } from "../../interfaces/environment/environment.step2.interface";

interface IRobotsList {
  reload: boolean;
}

export default function RobotsList({ reload }: IRobotsList): ReactElement {
  const [activeTab, setActiveTab] = useState<"Develop" | "Deploy">("Develop");
  const [robots, setRobots] = useState<
    | {
        step1: IEnvironmentStep1;
        step2: IEnvironmentStep2;
      }[]
    | null
  >(null);
  const { selectedState, applicationMode } = useMain();
  const { getRobotsFC, getDeploysFC } = useFunctions();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance &&
        selectedState?.fleet
      ) {
        setRobots(null);
        activeTab === "Develop" ? handleGetRobots() : handleGetDeploys();
      }

      const timer = setInterval(() => {
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance &&
        selectedState?.fleet &&
        activeTab === "Develop"
          ? handleGetRobots()
          : handleGetDeploys();
      }, 10000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reload, activeTab],
  );

  async function handleGetRobots() {
    setRobots(await getRobotsFC(false, false));
  }

  async function handleGetDeploys() {
    setRobots(await getDeploysFC(false, false));
  }

  return (
    <Fragment>
      <div className="flex w-full flex-col gap-4">
        <ul className="flex h-10 w-full items-center">
          {["Develop", "Deploy"]?.map((tab, index) => {
            return (
              <li
                className={`flex w-full min-w-max cursor-pointer flex-col items-center justify-center gap-3 px-1 text-xs font-medium  text-light-300 transition-all duration-500 hover:scale-95 ${activeTab === tab && "!text-primary-500"}`}
                onClick={() => setActiveTab(tab as "Develop" | "Deploy")}
              >
                <p>{tab}</p>
                <span
                  className={`h-[2px] w-full bg-light-300 ${activeTab === tab && "!bg-primary-500"}`}
                ></span>
              </li>
            );
          })}
        </ul>
      </div>
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
      ) : !Array.isArray(robots) ? (
        <SidebarListLoader />
      ) : robots?.length === 0 ? (
        <SidebarInfo text={`Create a Robot.`} />
      ) : (
        <Fragment>
          {robots?.map((robot, index: number) => {
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
                        <span className="font-medium">Physical:</span>
                        <StateCell
                          state={
                            robot?.step1?.clusters?.environment?.[1]?.status
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
