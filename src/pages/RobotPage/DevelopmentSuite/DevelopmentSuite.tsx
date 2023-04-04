import React, { ReactElement } from "react";
import SampleSplitter from "./Splitter";
import { useResizable } from "react-resizable-layout";
import { useComponentSize } from "react-use-size";
import Button from "../../../components/Button/Button";
import { Joystick } from "react-joystick-component";
import CardLayout from "../../../layouts/CardLayout";
import RemoteDesktopScene from "../../../components/RemoteDesktopScene/RemoteDesktopScene";

interface IDevelopmentSuiteProps {
  connectionURLs: any;
}

export default function DevelopmentSuite({
  connectionURLs,
}: IDevelopmentSuiteProps): ReactElement {
  const {
    isDragging: isControlDragging,
    position: controlH,
    splitterProps: controlDragBarProps,
  } = useResizable({
    axis: "y",
    initial: 1550,
    min: 250,
    reverse: true,
    disabled: true,
  });
  const {
    isDragging: isIDEDragging,
    position: ideW,
    splitterProps: ideDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 850,
    min: 650,
    max: 1500,
  });

  const cn = (...args: any[]) => args.filter(Boolean).join(" ");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ref, height, width } = useComponentSize();

  return (
    <CardLayout>
      <div
        className={
          "flex flex-column h-[55rem] max-h-[55rem] bg-dark font-mono color-white overflow-hidden animate__animated animate__fadeIn"
        }
      >
        <div className={"flex grow"}>
          <div
            className={cn(
              "shrink-0 contents h-[55rem]",
              isIDEDragging && "dragging"
            )}
            style={{ width: ideW }}
            ref={ref}
          >
            <iframe
              className={`h-full w-full ${
                isIDEDragging && "invisible"
              } animate__animated animate__fadeIn`}
              src={connectionURLs?.ideURL}
              title="Code Editor"
            />
          </div>
          <SampleSplitter isDragging={isIDEDragging} {...ideDragBarProps} />
          <div
            className={"flex flex-column h-[60rem] max-h-[60rem]"}
            style={{ width: "100%" }}
          >
            <div className={"flex grow"}>
              <div className={"grow bg-darker text-layer-dark-600"}>
                <RemoteDesktopScene isControllerActive={true} />
              </div>
            </div>
            <SampleSplitter
              dir={"horizontal"}
              isDragging={isControlDragging}
              {...controlDragBarProps}
            />
            <div
              className={cn(
                "shrink-0 bg-darker contents relative",
                isControlDragging && "dragging"
              )}
              style={{ height: controlH }}
            >
              <div className="absolute inset-0 bg-layer-light-100">
                <div
                  className="w-full flex items-center justify-between gap-2 p-4"
                  id="content"
                >
                  <div className="flex flex-col items-center justify-center gap-6 h-full">
                    <div className="flex gap-2">
                      <Button className="w-28" text="Start" disabled />
                      <Button className="w-28" text="Stop" />
                    </div>
                    <div className="flex items-center justify-center bg-layer-light-400 p-2 rounded-lg gap-2 text-sm">
                      <span>State:</span>
                      <span className="h-3 w-3 bg-secondary rounded-full" />
                      <span>Robot is running</span>
                    </div>
                  </div>
                  <div
                    ref={ref}
                    className="flex h-full items-center justify-center !overflow-hidden !scrollbar-hide"
                  >
                    <Joystick
                      size={100}
                      sticky={false}
                      move={(e: any) => {}}
                      stop={() => {}}
                      baseColor="#e0f1fe"
                      stickColor="#0ca0eb"
                    ></Joystick>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardLayout>
  );
}
