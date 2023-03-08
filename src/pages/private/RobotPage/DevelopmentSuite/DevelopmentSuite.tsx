/* eslint-disable jsx-a11y/iframe-has-title */
import React, { ReactElement } from "react";
import SampleSplitter from "./Splitter";
import { useResizable } from "react-resizable-layout";
import Stream from "./Stream";
import { BsCodeSquare } from "react-icons/bs";
import { useComponentSize } from "react-use-size";
import Button from "../../../../components/Button/Button";
import { Joystick } from "react-joystick-component";

interface IDevelopmentSuiteProps {
  connectionURLs: any;
}

export default function DevelopmentSuite({
  connectionURLs,
}: IDevelopmentSuiteProps): ReactElement {
  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps,
  } = useResizable({
    axis: "y",
    initial: 1550,
    min: 250,
    reverse: true,
    disabled: true,
  });
  const {
    isDragging: isFileDragging,
    position: fileW,
    splitterProps: fileDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 850,
    min: 650,
    max: 1500,
  });

  const cn = (...args: any[]) => args.filter(Boolean).join(" ");

  const { ref, height, width } = useComponentSize();

  return (
    <div
      className={
        "flex flex-column h-[55rem] max-h-[55rem] bg-dark font-mono color-white overflow-hidden"
      }
    >
      <div className={"flex grow"}>
        <div
          className={cn(
            "shrink-0 contents h-[55rem]",
            isFileDragging && "dragging"
          )}
          style={{ width: fileW }}
          ref={ref}
        >
          <iframe
            className={`h-full w-full ${
              isFileDragging && "invisible"
            } animate__animated animate__fadeIn`}
            src={connectionURLs?.ideURL}
          />
        </div>
        <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />
        <div
          className={"flex flex-column h-[60rem] max-h-[60rem]"}
          style={{ width: "100%" }}
        >
          <div className={"flex grow"}>
            <div className={"grow bg-darker contents text-layer-dark-600"}>
              <Stream connectionURLs={connectionURLs} />
            </div>
          </div>
          <SampleSplitter
            dir={"horizontal"}
            isDragging={isTerminalDragging}
            {...terminalDragBarProps}
          />
          <div
            className={cn(
              "shrink-0 bg-darker contents relative",
              isTerminalDragging && "dragging"
            )}
            style={{ height: terminalH }}
          >
            <div
              className="absolute inset-0 bg-layer-light-100"
              style={{ height: terminalH }}
            >
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
  );
}
