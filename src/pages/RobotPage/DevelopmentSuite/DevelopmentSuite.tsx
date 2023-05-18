import React, { ReactElement } from "react";
import SampleSplitter from "./Splitter";
import { useResizable } from "react-resizable-layout";
import CardLayout from "../../../layouts/CardLayout";
import RemoteDesktopScene from "../../../components/RemoteDesktopScene/RemoteDesktopScene";

interface IDevelopmentSuiteProps {
  connectionURLs: any;
  ros: any;
}

export default function DevelopmentSuite({
  connectionURLs,
  ros,
}: IDevelopmentSuiteProps): ReactElement {
  const {
    isDragging: isIDEDragging,
    position: ideW,
    splitterProps: ideDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 900,
    min: 50,
    reverse: true,
  });

  const cn = (...args: any[]) => args.filter(Boolean).join(" ");

  return (
    <CardLayout>
      <div
        className={
          "flex flex-col h-[55rem] bg-layer-dark-900 text-layer-light-50 overflow-hidden"
        }
      >
        <div className={"flex grow"}>
          <div className={"flex grow"}>
            <div className={"grow bg-darker contents"}>
              <iframe
                className={`h-full w-full animate__animated animate__fadeIn`}
                src={connectionURLs?.ideURL}
                title="Code Editor"
                style={
                  isIDEDragging
                    ? {
                        pointerEvents: "none",
                      }
                    : {}
                }
              />
            </div>
            <SampleSplitter isDragging={isIDEDragging} {...ideDragBarProps} />
            <div
              className={cn("shrink-0 contents", isIDEDragging && "dragging")}
              style={{ width: ideW }}
            >
              <RemoteDesktopScene isControllerActive />
            </div>
          </div>
        </div>
      </div>
    </CardLayout>
  );
}
