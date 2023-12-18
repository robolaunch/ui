import RemoteDesktopScene from "../../../components/RemoteDesktopScene/RemoteDesktopScene.tsx";
import RemoteDesktopTabs from "../../../components/RemoteDesktopTabs/RemoteDesktopTabs.tsx";
import StreamContext from "../../../contexts/VDIContext.tsx";
import { useAppSelector } from "../../../hooks/redux.ts";
import useRobot from "../../../hooks/useRobot.tsx";
import { ReactElement } from "react";
import Card from "../../../components/Card/Card.tsx";

export default function RemoteDesktop(): ReactElement {
  const { responseRobot } = useRobot();
  const { urls } = useAppSelector((state) => state.robot);

  return (
    <StreamContext
      vdiIngressEndpoint={urls?.vdi || responseRobot?.vdiIngressEndpoint}
    >
      <Card className="grid h-full grid-cols-12">
        <div className="col-span-12 h-full bg-dark-950 lg:col-span-8 xl:col-span-9 2xl:col-span-10">
          <RemoteDesktopScene isControllerActive={true} />
        </div>
        <div className="hidden flex-col lg:col-span-4 lg:flex xl:col-span-3 2xl:col-span-2">
          <RemoteDesktopTabs />
        </div>
      </Card>
    </StreamContext>
  );
}
