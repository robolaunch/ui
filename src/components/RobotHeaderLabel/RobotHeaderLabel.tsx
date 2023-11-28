import { ReactElement } from "react";

interface IRobotHeaderLabel {
  icon: "organization" | "region" | "instance" | "fleet";
  text: string;
}

export default function RobotHeaderLabel({
  icon,
  text,
}: IRobotHeaderLabel): ReactElement {
  return (
    <span className="flex items-center gap-2">
      {(() => {
        switch (icon) {
          case "organization":
            return (
              <img
                className="h-3.5 w-3.5"
                src="/svg/general/organization/organization-gray.svg"
                alt="organization"
              />
            );
          case "region":
            return (
              <img
                className="h-4 w-4"
                src="/svg/general/roboticscloud/roboticscloud-gray.svg"
                alt="region"
              />
            );
          case "instance":
            return (
              <img
                className="h-3.5 w-3.5"
                src="/svg/general/instance/instance-gray.svg"
                alt="instance"
              />
            );
          case "fleet":
            return (
              <img
                className="h-3.5 w-3.5"
                src="/svg/general/fleet/fleet-gray.svg"
                alt="fleet"
              />
            );
        }
      })()}
      <p className="text-xs font-light">
        <b className="xs:hidden 2xl:inline">{text?.split(" ")[0]}</b>{" "}
        <span>{text?.split(" ")[1]}</span>
      </p>
    </span>
  );
}
