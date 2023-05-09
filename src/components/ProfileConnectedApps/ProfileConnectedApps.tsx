import React, { Fragment, ReactElement, useState } from "react";
import CardLayout from "../../layouts/CardLayout";
import InputToggle from "../InputToggle/InputToggle";
import { useKeycloak } from "@react-keycloak/web";

interface IProfileConnectedApps {
  className?: string;
}

export default function ProfileConnectedApps({
  className,
}: IProfileConnectedApps): ReactElement {
  const { keycloak } = useKeycloak();

  const [mockData, setMockData] = useState<any[]>([
    {
      name: "Github",
      icon: "/svg/apps/github.svg",
      description:
        "If you have a Github account, you can connect it to your account to automatically import your repositories.",
      connected: keycloak?.tokenParsed?.githubApp,
    },
    {
      name: "Gitlab",
      icon: "/svg/apps/gitlab.svg",
      description:
        "If you have a Gitlab account, you can connect it to your account to automatically import your repositories.",
      connected: false,
    },
    {
      name: "Bitbucket",
      icon: "/svg/apps/bitbucket.svg",
      description:
        "If you have a Bitbucket account, you can connect it to your account to automatically import your repositories.",
      connected: false,
    },
    {
      name: "Slack",
      icon: "/svg/apps/slack.svg",
      description:
        "If you have a Slack account, you can connect it to your account to automatically import your repositories.",
      connected: false,
    },
  ]);

  return (
    <CardLayout className={`flex flex-col gap-5 p-6 h-fit ${className}`}>
      <Fragment>
        <p className="text-lg font-bold text-layer-dark-600">Connected Apps</p>
        {mockData?.map((app: any, index: number) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center border border-layer-light-200 p-3.5 rounded-lg"
            >
              <div className="flex gap-4">
                <img
                  className="w-11"
                  src={app?.icon}
                  alt={`${app?.name} icon`}
                />
                <div className="flex flex-col justify-between">
                  <p className="text-base font-medium text-layer-dark-700">
                    {app?.name}
                  </p>
                  <p className="text-xs text-layer-dark-500">
                    {app?.description}
                  </p>
                </div>
              </div>
              <InputToggle
                className="!scale-125"
                checked={app?.connected}
                onChange={() => {
                  setMockData((prev) => {
                    return prev.map((item) => {
                      if (item?.name === app?.name) {
                        return {
                          ...item,
                          connected: !item?.connected,
                        };
                      }
                      return item;
                    });
                  });
                }}
              />
            </div>
          );
        })}
      </Fragment>
    </CardLayout>
  );
}
