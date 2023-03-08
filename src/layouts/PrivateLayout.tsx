import React, { FC, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { SidebarContext } from "../context/SidebarContext";

export const PrivateLayout: FC = () => {
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);

  const handleCloseSidebar = () => {
    if (sidebarState?.isOpen) {
      setSidebarState((previousState: any) => {
        return {
          ...previousState,
          isOpen: false,
          page: undefined,
          isCreateMode: false,
        };
      });
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div
          className="flex flex-col"
          style={{ width: "calc(100% - 5rem)", marginLeft: "5rem" }}
          onClick={() => handleCloseSidebar()}
        >
          <Header />
          <div className="p-10 bg-layer-light-bg">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
