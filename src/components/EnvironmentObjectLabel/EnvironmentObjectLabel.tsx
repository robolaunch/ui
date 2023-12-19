import { ReactElement } from "react";

interface IEnvironmentObjectLabel {
  icon: "organization" | "region" | "instance" | "fleet";
  text: string;
}

export default function EnvironmentObjectLabel({
  icon,
  text,
}: IEnvironmentObjectLabel): ReactElement {
  return (
    <span className="flex items-center gap-1.5">
      {(() => {
        switch (icon) {
          case "organization":
            return (
              <img
                className="h-3.5 w-3.5"
                src="/svg/general/organization/organization-dark.svg"
                alt="organization"
              />
            );
          case "region":
            return (
              <img
                className="h-3.5 w-3.5"
                src="/svg/general/roboticscloud/roboticscloud-dark.svg"
                alt="region"
              />
            );
          case "instance":
            return (
              <img
                className="h-3.5 w-3.5"
                src="/svg/general/instance/instance-dark.svg"
                alt="instance"
              />
            );
          case "fleet":
            return (
              <img
                className="h-3.5 w-3.5"
                src="/svg/general/fleet/fleet-dark.svg"
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
