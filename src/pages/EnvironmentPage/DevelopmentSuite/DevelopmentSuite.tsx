import RemoteDesktopScene from "../../../components/RemoteDesktopScene/RemoteDesktopScene";
import RemoteDesktopTabs from "../../../components/RemoteDesktopTabs/RemoteDesktopTabs";
import { useComponentSize } from "react-use-size/dist/useComponentSize";
import StreamContext from "../../../contexts/VDIContext";
import { useAppSelector } from "../../../hooks/redux";
import Card from "../../../components/Card/Card";
import useRobot from "../../../hooks/useRobot";
import { ReactElement, useState } from "react";
import ImageSplitter from "./ImageSplitter";

export default function DevelopmentSuite(): ReactElement {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { ref, width } = useComponentSize();
  const { responseRobot } = useRobot();
  const { urls } = useAppSelector((state) => state.robot);

  return (
    <Card>
      <ImageSplitter
        setIsDragging={setIsDragging}
        source={
          <StreamContext>
            <div ref={ref} className=" grid h-full grid-cols-12">
              <div className="col-span-12 h-full bg-light-900 lg:col-span-8 xl:col-span-9 2xl:col-span-10">
                <RemoteDesktopScene isControllerActive={true} />
              </div>
              <div className="hidden flex-col lg:col-span-4 lg:flex xl:col-span-3 2xl:col-span-2">
                <RemoteDesktopTabs />
              </div>
            </div>
          </StreamContext>
        }
        content={
          <iframe
            allow="clipboard-read"
            className={`animate-fadeIn h-full w-full ${
              isDragging && "pointer-events-none"
            }`}
            src={urls?.ide || responseRobot?.ideIngressEndpoint}
            title="Code Editor"
            style={{
              width: `${width}px`,
              height: "100%",
            }}
          />
        }
        startPosition={41.5}
      />
    </Card>
  );
}
