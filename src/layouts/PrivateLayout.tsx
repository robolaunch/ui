import TopLoadingBar from "../components/TopLoadingBar/TopLoadingBar";
import useWindowDimensions from "../hooks/useWindowDimensions";
import React, { Fragment, ReactElement } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import useMain from "../hooks/useMain";
import { toast } from "sonner";

export default function PrivateLayout(): ReactElement {
  const { sidebarState, setSidebarState } = useMain();
  const { width } = useWindowDimensions();

  function handleCloseSidebar() {
    if (sidebarState?.isOpen && !sidebarState?.isCreateMode) {
      setSidebarState((previousState: any) => {
        return {
          ...previousState,
          isOpen: false,
          page: undefined,
          isCreateMode: false,
        };
      });
    } else if (sidebarState?.isOpen && sidebarState?.isCreateMode) {
      toast.error("You can't close the sidebar while create mode is active.");
    }
  }

  return (
    <Fragment>
      <div className="flex">
        <Sidebar />
        <div
          className={`transition-500 ml-16 flex min-h-screen flex-col lg:ml-20 ${
            sidebarState?.isOpen && "blur-sm"
          } ${sidebarState?.isCreateMode && "pointer-events-none"}`}
          style={{
            width: `calc(100% - ${width > 1024 ? "5" : "4"}rem)`,
          }}
          onClick={() => handleCloseSidebar()}
        >
          <Header />
          <div className="h-full bg-transparent p-6">
            <Outlet />
          </div>
        </div>
      </div>
      <TopLoadingBar />
    </Fragment>
  );
}
