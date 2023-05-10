import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import { SidebarContext } from "../contexts/SidebarContext";
import Sidebar from "../components/Sidebar/Sidebar";
import LoadingBar from "react-top-loading-bar";

export default function PrivateLayout(): ReactElement {
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);

  function handleCloseSidebar() {
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
  }

  const url = useLocation();
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    setProgress(50);
    setTimeout(() => setProgress(100), 300);
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
        height={3}
        color={`#AC2DFE`}
        progress={progress}
        shadow={true}
        transitionTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
    </Fragment>
  );
}
