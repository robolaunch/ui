import React, { Fragment, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import CardLayout from "../../layouts/CardLayout";
import ContentLoader from "react-content-loader";
import Button from "../Button/Button";
import RobotResource from "../RobotResource/RobotResource";
import RobotConnectionsViewer from "../RobotConnectionsViewer/RobotConnectionsViewer";
import { envOnPremise } from "../../helpers/envProvider";
import RobotHeaderTabs from "../RobotHeaderTabs/RobotHeaderTabs";
import useRobot from "../../hooks/useRobot";

interface IRobotHeader {
  handleChangeActiveTab: any;
}

export default function RobotHeader({
  handleChangeActiveTab,
}: IRobotHeader): ReactElement {
  const url = useParams();

  const { ros, responseRobot, isSettedCookie, activeTab } = useRobot();

  return (
    <CardLayout className="pt-6 px-8 !pb-0">
      <Fragment>
        <div className="h-28 flex items-center justify-between">
          <div className="h-full flex flex-col justify-around">
            <div className="flex gap-2 items-center">
              <span className="text-lg font-medium">{url?.robotName}</span>

              <div
                className={`text-[0.64rem] capitalize font-medium px-3 py-1 rounded-lg w-fit text-layer-primary-500 bg-layer-primary-100`}
              >
                {responseRobot?.robotClusters?.length === 1
                  ? `Virtual ${envOnPremise ? "Application" : "Robot"}`
                  : (responseRobot?.robotClusters?.length === 2 &&
                      `Physical ${envOnPremise ? "Application" : "Robot"}`) || (
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
            <span className="flex gap-2 items-center">
              <AiOutlineTeam size={16} />
              <span className="text-xs font-light">
                {url?.organizationName} Organization
              </span>
            </span>

            <span className="flex gap-2 items-center">
              <IoLocationOutline size={16} />
              <span className="text-xs font-light">Ankara, Turkiye</span>
            </span>
          </div>

          <div className="hidden md:flex text-xs font-medium text-layer-dark-400 gap-8">
            <div className="h-full flex flex-col items-end gap-4">
              <div className="flex gap-2">
                <div className="flex  items-center rounded-lg">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={responseRobot?.ideIngressEndpoint}
                  >
                    <Button
                      text={"Code Editor"}
                      className="!h-9 text-xs px-4"
                    />
                  </a>
                </div>
                <div className="flex items-center rounded-lg p-2">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://${
                      responseRobot?.vdiIngressEndpoint?.split("//")[1]
                    }`}
                  >
                    <Button
                      text={"Remote Desktop"}
                      className="!h-9 text-xs px-4"
                    />
                  </a>
                </div>
              </div>
              <RobotConnectionsViewer
                ide={isSettedCookie}
                vdiURL={responseRobot?.vdiIngressEndpoint}
                ros={ros}
              />
              <RobotResource responseRobot={responseRobot} />
            </div>
          </div>
        </div>
        <RobotHeaderTabs
          responseRobot={responseRobot}
          isSettedCookie={isSettedCookie}
          handleChangeActiveTab={handleChangeActiveTab}
          activeTab={activeTab}
        />
      </Fragment>
    </CardLayout>
  );
}
