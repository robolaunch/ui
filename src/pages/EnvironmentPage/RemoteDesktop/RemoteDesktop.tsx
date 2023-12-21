import RemoteDesktopScene from "../../../components/RemoteDesktopScene/RemoteDesktopScene";
import RemoteDesktopTabs from "../../../components/RemoteDesktopTabs/RemoteDesktopTabs";
import StreamContext from "../../../contexts/VDIContext";
import { ReactElement } from "react";
import Card from "../../../components/Card/Card";

export default function RemoteDesktop(): ReactElement {
  return (
    <StreamContext>
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
