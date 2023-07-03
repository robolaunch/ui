import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import LoadingBar from "react-top-loading-bar";
import useSidebar from "../hooks/useSidebar";
import { toast } from "sonner";

export default function PrivateLayout(): ReactElement {
  const { sidebarState, setSidebarState } = useSidebar();
  const url = useLocation();

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

  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    setProgress(50);
    setTimeout(() => setProgress(100), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <Fragment>
      <div className="flex">
        <Sidebar />
        <div
          className="flex flex-col"
          style={{
            width: "calc(100% - 5rem)",
            marginLeft: "5rem",
            minHeight: "100vh",
            pointerEvents:
              sidebarState?.isOpen && sidebarState?.isCreateMode
                ? "none"
                : "all",
            filter:
              sidebarState?.isOpen && sidebarState?.isCreateMode
                ? "blur(5px)"
                : "none",
          }}
          onClick={() => handleCloseSidebar()}
        >
          <Header />
          <div className="p-6 bg-layer-light-bg h-full">
            <Outlet />
          </div>
        </div>
      </div>
      <LoadingBar
        height={4}
        progress={progress}
        shadow={true}
        transitionTime={500}
        onLoaderFinished={() => setProgress(0)}
        style={{
          background: "linear-gradient(to right, #AC2DFE, #35B8FA)",
        }}
      />
    </Fragment>
  );
}
