import React, { ReactElement, useEffect, useState } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import { useParams } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import RosCameraWidget from "../../../../components/RosCameraWidget/RosCameraWidget";
import { useAppSelector } from "../../../../hooks/redux";
import { RootState } from "../../../../app/store";
import RosTopicListWidget from "../../../../components/RosTopicListWidget/RosTopicListWidget";
import RosCmdVelWidget from "../../../../components/RosCmdVelWidget/RosCmdVelWidget";

interface IVisualization {
  ros: any;
  topicList: string[];
  handleForceUpdate: (page: string) => void;
}

export default function Visualization({
  ros,
  topicList,
  handleForceUpdate,
}: IVisualization): ReactElement {
  const [grid, setGrid] = useState<any>();
  const { currentOrganization } = useAppSelector(
    (state: RootState) => state.organization
  );

  const url = useParams();

  const [localStoragePath, setLocalStoragePath] = useState<string>(
    `visualization_${currentOrganization.name}_${url.teamName}_${url.roboticsCloudName}_${url.fleetName}_${url.robotName}`
  );
  const [gridLayout, setGridLayout] = useState<any>(() => {
    if (localStorage.getItem(localStoragePath)) {
      return JSON.parse(
        // @ts-ignore
        localStorage.getItem(localStoragePath)
      );
    }

    return [];
  });

  useEffect(() => {
    const grid: any = GridStack.init({
      acceptWidgets: true,
      alwaysShowResizeHandle: true,
      removable: false,
      resizable: {
        handles: "e, se, s, sw, w",
      },
    });
    setGrid(grid);

    grid.on("change", function () {
      console.log("change");
      console.log(grid.save(true, true).children);
      setTimeout(() => {
        window.localStorage.setItem(
          // @ts-ignore
          localStoragePath,
          JSON.stringify(grid.save(true, true).children)
        );
      }, 1000);
    });
  }, [localStoragePath]);

  const handleAddWidget = (widget: string) => {
    console.log("handleAddWidget", widget);
    const temp = grid.save(true, true).children;
    temp.push({
      x: 99,
      y: 99,
      w: 4,
      h: 4,
      content:
        widget === "RosCameraWidget"
          ? ReactDOMServer.renderToString(
              <RosCameraWidget
                id={grid.save(true, true).children.length}
                ros={ros}
                topicList={topicList}
                localStoragePath={localStoragePath}
                handleRemoveWidget={handleRemoveWidget}
              />
            )
          : widget === "RosTopicListWidget"
          ? ReactDOMServer.renderToString(
              <RosTopicListWidget
                id={grid.save(true, true).children.length}
                ros={ros}
                handleRemoveWidget={handleRemoveWidget}
              />
            )
          : widget === "RosCmdVelWidget" &&
            ReactDOMServer.renderToString(
              <RosCmdVelWidget
                id={grid.save(true, true).children.length}
                ros={ros}
                handleRemoveWidget={handleRemoveWidget}
              />
            ),
    });
    window.localStorage.setItem(
      // @ts-ignore
      localStoragePath,
      JSON.stringify(temp)
    );

    handleForceUpdate("Visualization");
  };

  function handleRemoveWidget(id: number) {
    const temp = JSON.parse(
      // @ts-ignore

      localStorage.getItem(localStoragePath)
    );

    temp.splice(id, 1);

    window.localStorage.setItem(
      // @ts-ignore
      localStoragePath,
      JSON.stringify(temp)
    );

    handleForceUpdate("Visualization");
  }

  return (
    <div className="grid grid-cols-1 gap-4 animate__animated animate__fadeIn">
      <div className="col-span-1 w-full flex gap-4 p-4 bg-layer-light-50 rounded-lg shadow">
        <button onClick={() => handleAddWidget("RosCameraWidget")}>
          add RosCameraWidget
        </button>
        <button onClick={() => handleAddWidget("RosTopicListWidget")}>
          add RosTopicListWidget
        </button>
        <button onClick={() => handleAddWidget("RosCmdVelWidget")}>
          add RosCmdVelWidget
        </button>
      </div>
      <div className="col-span-1 grid-stack min-h-[40rem] max-h-[40rem]">
        {gridLayout.map((item: any, index: number) => {
          console.log(item);
          return (
            <div
              key={index}
              className="grid-stack-item ui-draggable ui-resizable"
              gs-w={item.w}
              gs-h={item.h}
              gs-x={item.x}
              gs-y={item.y}
            >
              <div className="grid-stack-item-content">
                {item.content.search("RosCameraWidget") > 0 && (
                  <RosCameraWidget
                    id={index}
                    ros={ros}
                    topicList={topicList}
                    localStoragePath={localStoragePath}
                    handleRemoveWidget={handleRemoveWidget}
                  />
                )}
                {item.content.search("RosTopicListWidget") > 0 && (
                  <RosTopicListWidget
                    id={index}
                    ros={ros}
                    handleRemoveWidget={handleRemoveWidget}
                  />
                )}
                {item.content.search("RosCmdVelWidget") > 0 && (
                  <RosCmdVelWidget
                    id={index}
                    ros={ros}
                    handleRemoveWidget={handleRemoveWidget}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
