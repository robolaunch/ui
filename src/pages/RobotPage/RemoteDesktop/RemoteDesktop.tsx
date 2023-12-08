import RemoteDesktopTabs from "../../../components/RemoteDesktopTabs/RemoteDesktopTabs.tsx";
import RemoteDesktopScene from "../../../components/RemoteDesktopScene/RemoteDesktopScene.tsx";
import StreamContext from "../../../contexts/VDIContext.tsx";
import { useAppSelector } from "../../../hooks/redux.ts";
import CardLayout from "../../../layouts/CardLayout";
import useRobot from "../../../hooks/useRobot.tsx";
import { Fragment, ReactElement } from "react";

export default function RemoteDesktop(): ReactElement {
  const { isSettedCookie, responseRobot } = useRobot();
  const { urls } = useAppSelector((state) => state.robot);

  return (
    <CardLayout
      className="lg:min-h-[20rem] xl:min-h-[30rem] 2xl:min-h-[40rem]"
      loading={!isSettedCookie}
    >
      <Fragment>
        {isSettedCookie && (
          <StreamContext
            vdiIngressEndpoint={urls?.vdi || responseRobot?.vdiIngressEndpoint}
          >
            <div className="animate__animated animate__fadeIn grid grid-cols-12">
              <div className="col-span-12 bg-light-900 lg:col-span-8 xl:col-span-9 2xl:col-span-10 ">
                <RemoteDesktopScene isControllerActive={true} />
              </div>
              <div className="hidden flex-col lg:col-span-4 lg:flex xl:col-span-3 2xl:col-span-2">
                <RemoteDesktopTabs />
              </div>
            </div>
          </StreamContext>
        )}
      </Fragment>
    </CardLayout>
  );
}
