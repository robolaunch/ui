import { ProfileActiveTab } from "../../interfaces/global/profile.interface";
import { useKeycloak } from "@react-keycloak/web";
import CardLayout from "../../layouts/CardLayout";
import useProfile from "../../hooks/useProfile";
import Gravatar from "react-gravatar";
import { ReactElement } from "react";

export default function ProfileHeader(): ReactElement {
  const { keycloak } = useKeycloak();

  const { activeTab, setActiveTab, tabs } = useProfile();

  return (
    <CardLayout className={`col-span-2 flex flex-col gap-6`}>
      <div className="flex gap-6 px-8 pt-6">
        <Gravatar
          email={keycloak?.tokenParsed?.email}
          className="h-24 w-24 rounded"
          default="mp"
          size={200}
        />
        <div className="flex flex-col justify-between py-2">
          <p className="font-medium text-light-700">
            {keycloak?.tokenParsed?.name}
          </p>
          <p className="text-sm text-light-500">
            {keycloak?.tokenParsed?.preferred_username}
          </p>
          <p className="text-sm text-light-400">
            {keycloak?.tokenParsed?.email}
          </p>
        </div>
      </div>
      <ul className="-mb-1.5 flex gap-8 overflow-x-auto px-6 pt-5">
        {tabs.map((tab: ProfileActiveTab, index: number) => {
          return (
            <div
              className="flex cursor-pointer flex-col gap-3 "
              onClick={() => setActiveTab(tab)}
              key={index}
            >
              <li
                className={`min-w-max px-2 text-xs font-medium transition-all duration-500 hover:scale-90  ${
                  tab === activeTab ? "text-primary-500" : "text-light-500"
                } `}
              >
                {tab}
              </li>
              <div
                className={`h-[2px] w-full transition-all duration-500 
                  ${tab === activeTab ? "bg-primary-500" : "bg-light-100"} `}
              />
            </div>
          );
        })}
      </ul>
    </CardLayout>
  );
}
