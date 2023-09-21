import React, { Fragment, ReactElement, useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import LoadingBar from "react-top-loading-bar";
import useMain from "../hooks/useMain";
import { toast } from "sonner";

export default function PrivateLayout(): ReactElement {
  const { sidebarState, setSidebarState } = useMain();
  const { width } = useWindowDimensions();
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
          className={`transition-500 ml-16 flex min-h-screen flex-col lg:ml-20 ${
            sidebarState?.isOpen && "blur-sm"
          } ${sidebarState?.isCreateMode && "pointer-events-none"}`}
          style={{
            width: `calc(100% - ${width > 1024 ? "5" : "4"}rem)`,
          }}
          onClick={() => handleCloseSidebar()}
        >
          <Header />
          <div className="h-full bg-layer-light-bg p-6">
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
