import React, { ReactElement, useState } from "react";
import RemoteDesktopScene from "../../../components/RemoteDesktopScene/RemoteDesktopScene";
import RemoteDesktopTabs from "../../../components/RemoteDesktopTabs/RemoteDesktopTabs";
import { useComponentSize } from "react-use-size/dist/useComponentSize";
import StreamContext from "../../../contexts/VDIContext";
import CardLayout from "../../../layouts/CardLayout";
import ImageSplitter from "./ImageSplitter";
interface IDevelopmentSuite {
  ideURL: string;
  vdiURL: string;
}

export default function DevelopmentSuite({
  ideURL,
  vdiURL,
}: IDevelopmentSuite): ReactElement {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { ref, width } = useComponentSize();

  return (
    <CardLayout>
      <ImageSplitter
        setIsDragging={setIsDragging}
        source={
          <StreamContext vdiIngressEndpoint={vdiURL}>
            <div
              ref={ref}
              className="animate__animated animate__fadeIn grid grid-cols-12"
            >
              <div className="col-span-12 bg-layer-dark-900 lg:col-span-8 xl:col-span-9 2xl:col-span-10 ">
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
            className={`animate__animated animate__fadeIn h-full w-full ${
              isDragging && "pointer-events-none"
            }`}
            src={ideURL}
            title="Code Editor"
            style={{
              width: `${width}px`,
              height: "100%",
            }}
          />
        }
        startPosition={41.5}
      />
    </CardLayout>
  );
}
