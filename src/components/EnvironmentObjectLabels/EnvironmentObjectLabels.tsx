import { envApplication } from "../../helpers/envProvider";
import useCreateRobot from "../../hooks/useCreateRobot";
import { Fragment, ReactElement } from "react";
import Skeleton from "../Skeleton/Skeleton";

export default function EnvironmentObjectLabels(): ReactElement {
  const { robotData } = useCreateRobot();

  return (
    <Fragment>
      {[
        `Organization: ${robotData.step1.tree.organization?.name}
        `,
        `Region: ${robotData.step1.tree.region?.name}`,
        `Instance: ${robotData.step1.tree.cloudInstance?.name}`,
        `${envApplication ? "Namespace" : "Fleet"}: ${robotData.step1.tree
          .namespace?.name}`,
      ].map((item, index) => {
        return (
          <div className="flex items-center gap-1.5" key={index}>
            {robotData.step1.details?.name ? (
              <Fragment>
                {(() => {
                  if (!robotData.step1.details?.name) {
                    return;
                  }
                  switch (index) {
                    case 0:
                      return (
                        <img
                          className="animate-fadeIn h-3.5 w-3.5"
                          src="/svg/general/organization/organization-dark.svg"
                          alt="organization"
                        />
                      );
                    case 1:
                      return (
                        <img
                          className="animate-fadeIn h-3.5 w-3.5"
                          src="/svg/general/roboticscloud/roboticscloud-dark.svg"
                          alt="region"
                        />
                      );
                    case 2:
                      return (
                        <img
                          className="animate-fadeIn h-3.5 w-3.5"
                          src="/svg/general/instance/instance-dark.svg"
                          alt="instance"
                        />
                      );
                    case 3:
                      return (
                        <img
                          className="animate-fadeIn h-3.5 w-3.5"
                          src="/svg/general/fleet/fleet-dark.svg"
                          alt="fleet"
                        />
                      );
                  }
                })()}
                <p className="animate-fadeIn text-xs font-light">
                  <b className="xs:hidden 2xl:inline">{item?.split(" ")[0]}</b>{" "}
                  <span>{item?.split(" ")[1]}</span>
                </p>
              </Fragment>
            ) : (
              <Skeleton className="min-h-5 min-w-36" />
            )}
          </div>
        );
      })}
    </Fragment>
  );
}
