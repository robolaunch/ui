import React, { ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import Gravatar from "react-gravatar";
import { useKeycloak } from "@react-keycloak/web";
// import { useAppDispatch, useAppSelector } from "../../hooks/redux";
// import { updateUrls } from "../../resources/UserSlice";

interface IProfileHeader {
  className?: string;
  activeTab: string;
  handleChangeActiveTab: (tab: string) => void;
}

export default function ProfileHeader({
  className,
  activeTab,
  handleChangeActiveTab,
}: IProfileHeader): ReactElement {
  const { keycloak } = useKeycloak();

  // const { urls } = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();

  // const inputs = (
  //   <div className="flex flex-col gap-5">
  //     <label className="flex gap-2" htmlFor="">
  //       vdi (ws://localhost:8080/) (son ek "/" olmalı)
  //       <input
  //         className="border border-layer-light-200"
  //         type="text"
  //         value={urls?.vdi}
  //         onChange={(e) => {
  //           dispatch(updateUrls({ ...urls, vdi: e.target.value }));
  //         }}
  //       />
  //     </label>
  //     <label className="flex gap-2" htmlFor="">
  //       ide (http://localhost:3000/) (son ek "/" olmalı)
  //       <input
  //         className="border border-layer-light-200"
  //         type="text"
  //         value={urls?.ide}
  //         onChange={(e) => {
  //           dispatch(updateUrls({ ...urls, ide: e.target.value }));
  //         }}
  //       />
  //     </label>
  //     <label className="flex gap-2" htmlFor="">
  //       ros (ws://localhost:9090) (boş bırakılmamalı. bırakılacaksa örnekteki
  //       yazılmalı)
  //       <input
  //         className="border border-layer-light-200"
  //         type="text"
  //         value={urls?.ros}
  //         onChange={(e) => {
  //           dispatch(updateUrls({ ...urls, ros: e.target.value }));
  //         }}
  //       />
  //     </label>
  //   </div>
  // );

  return (
    <CardLayout className={`col-span-1 flex flex-col gap-6 ${className}`}>
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
        {/* {inputs} */}
      </div>
      <ul className="flex gap-8 px-6 pt-5 -mb-1.5 overflow-x-auto">
        {[
          "Overview",
          "Profile Info",
          "Connected Apps",
          "Email Preferances",
          "Notifications",
          "Change Password",
          "Deactive Account",
        ].map((tab: any, index: number) => {
          return (
            <div
              className="flex flex-col gap-3 cursor-pointer "
              onClick={() => handleChangeActiveTab(tab)}
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
