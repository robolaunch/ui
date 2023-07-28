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
              className="grid grid-cols-12 animate__animated animate__fadeIn"
            >
              <div className="col-span-12 lg:col-span-8 xl:col-span-9 2xl:col-span-10 bg-layer-dark-900 ">
                <RemoteDesktopScene isControllerActive={true} />
              </div>
              <div className="hidden lg:col-span-4 xl:col-span-3 2xl:col-span-2 lg:flex flex-col">
                <RemoteDesktopTabs />
              </div>
            </div>
          </StreamContext>
        }
        content={
          <iframe
            allow="clipboard-read"
            className={`w-full animate__animated animate__fadeIn h-full ${
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
