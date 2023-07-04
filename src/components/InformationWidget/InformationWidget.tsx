import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";

interface IInformationWidget {
  title: string;
  subtitle: string;
  actiontitle?: string;
  component: ReactElement;
}

export default function InformationWidget({
  title,
  subtitle,
  actiontitle,
  component,
}: IInformationWidget): ReactElement {
  const url = useParams();

  function handleGetImageURL() {
    if (url?.robotName) {
      return `/svg/general/robot/robot-gray.svg`;
    } else if (url?.fleetName) {
      return `/svg/general/fleet/fleet-gray.svg`;
    } else if (url?.instanceName) {
      return `/svg/general/instance/instance-gray.svg`;
    } else if (url?.roboticsCloudName) {
      return `/svg/general/roboticscloud/roboticscloud-gray.svg`;
    } else if (url?.organizationName) {
      return `/svg/general/organization/organization-gray.svg`;
    }
  }

  return (
    <div
      className="w-full h-full flex flex-col justify-around rounded-lg bg-layer-light-50 shadow-lg p-8 animate__animated animate__fadeIn"
      style={{
        backgroundImage: `url("/images/abstract-white.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex gap-2 items-center">
          {handleGetImageURL() && (
            <img
              className="w-9 h-9"
              src={handleGetImageURL()}
              alt="robolaunch"
            />
          )}
          <span className="text-2xl font-semibold text-layer-dark-600 ">
            {title}
          </span>
        </div>
        <p className="text-xs text-layer-dark-500 !leading-6">{subtitle}</p>
      </div>
      {component}
    </div>
  );
}
