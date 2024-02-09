import { Fragment, ReactElement } from "react";
import Skeleton from "../Skeleton/Skeleton";
import { useAppSelector } from "../../hooks/redux";
import useMain from "../../hooks/useMain";

export default function EnvironmentObjectLabels(): ReactElement {
  const { robotData } = useMain();
  const { applicationMode } = useAppSelector((state) => state.user);

  const { selectedState } = useMain();

  return (
    <Fragment>
      {[
        `Organization: ${selectedState?.organization?.name}
        `,
        `Region: ${selectedState?.roboticsCloud?.name}`,
        `Instance: ${selectedState?.instance?.name}`,
        `${applicationMode ? "Namespace" : "Fleet"}: ${selectedState?.fleet?.name}`,
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
