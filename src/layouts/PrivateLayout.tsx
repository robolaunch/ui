import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import LoadingBar from "react-top-loading-bar";
import useMain from "../hooks/useMain";
import { toast } from "sonner";
import useWindowDimensions from "../hooks/useWindowDimensions";

export default function PrivateLayout(): ReactElement {
  const { sidebarState, setSidebarState } = useMain();
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

  const { width } = useWindowDimensions();

  return (
    <Fragment>
      <div className="flex">
        <Sidebar />
        <div
          className={`flex flex-col transition-500 ml-16 lg:ml-20 min-h-screen ${
            sidebarState?.isOpen && "blur-sm"
          } ${sidebarState?.isCreateMode && "pointer-events-none"}`}
          style={{
            width: `calc(100% - ${width > 1024 ? "5" : "4"}rem)`,
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
