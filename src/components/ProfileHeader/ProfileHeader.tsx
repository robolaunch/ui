import React, { ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import Gravatar from "react-gravatar";
import { useKeycloak } from "@react-keycloak/web";
import useProfile from "../../hooks/useProfile";
import { ProfileActiveTab } from "../../interfaces/profileInterfaces";

export default function ProfileHeader(): ReactElement {
  const { keycloak } = useKeycloak();

  const { activeTab, setActiveTab, tabs } = useProfile();

  return (
    <CardLayout className={`flex flex-col gap-6 col-span-2`}>
      <div className="flex gap-6 pt-6 px-8">
        <Gravatar
          email={keycloak?.tokenParsed?.email}
          className="h-24 w-24 rounded"
          default="mp"
          size={200}
        />
        <div className="flex flex-col justify-between py-2">
          <p className="font-medium text-layer-dark-700">
            {keycloak?.tokenParsed?.name}
          </p>
          <p className="text-sm text-layer-dark-500">
            {keycloak?.tokenParsed?.preferred_username}
          </p>
          <p className="text-sm text-layer-dark-500">
            {keycloak?.tokenParsed?.email}
          </p>
        </div>
      </div>
      <ul className="flex gap-8 px-6 pt-5 -mb-1.5 overflow-x-auto">
        {tabs.map((tab: ProfileActiveTab, index: number) => {
          return (
            <div
              className="flex flex-col gap-3 cursor-pointer "
              onClick={() => setActiveTab(tab)}
              key={index}
            >
              <li
                className={`text-xs font-medium px-2 transition-all duration-500 min-w-max hover:scale-90  ${
                  tab === activeTab
                    ? "text-layer-primary-500"
                    : "text-layer-light-500"
                } `}
              >
                {tab}
              </li>
              <div
                className={`w-full h-[2px] transition-all duration-500 
                  ${
                    tab === activeTab
                      ? "bg-layer-primary-500"
                      : "bg-layer-light-100"
                  } `}
              />
            </div>
          );
        })}
      </ul>
    </CardLayout>
  );
}
