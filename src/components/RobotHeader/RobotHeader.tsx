import React, { ReactElement } from "react";
import RobotConnectionsViewer from "../RobotConnectionsViewer/RobotConnectionsViewer";
import RobotServiceButtons from "../RobotServiceButtons/RobotServiceButtons";
import RobotHeaderTabs from "../RobotHeaderTabs/RobotHeaderTabs";
import { envOnPremiseRobot } from "../../helpers/envProvider";
import RobotResource from "../RobotResource/RobotResource";
import { IoLocationOutline } from "react-icons/io5";
import CardLayout from "../../layouts/CardLayout";
import ContentLoader from "react-content-loader";
import { AiOutlineTeam } from "react-icons/ai";
import { useParams } from "react-router-dom";
import useRobot from "../../hooks/useRobot";
import useMain from "../../hooks/useMain";

export default function RobotHeader(): ReactElement {
  const { ros, responseRobot, isSettedCookie } = useRobot();
  const { selectedState } = useMain();
  const url = useParams();

  return (
    <div data-tut="robot-header" className="col-span-full">
      <CardLayout className="px-8 !pb-0 pt-6">
        <div className="flex h-28 items-center justify-between">
          <div
            data-tut="robot-information"
            className="flex h-full flex-col justify-around"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">{url?.robotName}</span>
              <div className="w-fit rounded-lg bg-layer-primary-100 px-3 py-1 text-[0.64rem] font-medium capitalize text-layer-primary-500">
                {responseRobot?.robotClusters?.length === 1
                  ? `Virtual ${envOnPremiseRobot ? "Application" : "Robot"}`
                  : (responseRobot?.robotClusters?.length === 2 &&
                      `Physical ${
                        envOnPremiseRobot ? "Application" : "Robot"
                      }`) || (
                      <ContentLoader
                        speed={1}
                        width={64}
                        height={18}
                        backgroundColor="#f5e5ff"
                        foregroundColor="#fbf4ff"
                      >
                        <rect width="64" height="18" />
                      </ContentLoader>
                    )}
              </div>
            </div>
            <span className="flex items-center gap-2">
              <AiOutlineTeam size={16} />
              <span className="text-xs font-light">
                {url?.organizationName} Organization
              </span>
            </span>
            <span className="flex items-center gap-2">
              <IoLocationOutline size={16} />
              <span className="text-xs font-light">
                {selectedState?.roboticsCloud?.region}
              </span>
            </span>
          </div>
          <div className="hidden gap-8 text-xs font-medium text-layer-dark-400 md:flex">
            <div className="flex h-full flex-col items-end gap-4">
              <RobotServiceButtons />
              <RobotConnectionsViewer
                ide={isSettedCookie}
                vdiURL={responseRobot?.vdiIngressEndpoint}
                ros={ros}
              />
              <RobotResource responseRobot={responseRobot} />
            </div>
          </div>
        </div>
        <RobotHeaderTabs />
      </CardLayout>
    </div>
  );
}
