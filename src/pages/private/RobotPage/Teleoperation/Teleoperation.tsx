import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { GridStack } from "gridstack";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";
import { RootState } from "../../../../app/store";
import { FloatMenu } from "../../../../components/FloatMenu/FloatMenu";
import { GridLayout } from "../../../../layouts/GridLayout";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.css";
import ROSLIB from "roslib";

interface ITeleoperation {
  ros: any;
  topicList: string[];
  handleForceUpdate: (page: string) => void;
}

export default function Teleoperation({
  ros,
  topicList,
  handleForceUpdate,
}: ITeleoperation): ReactElement {
  const [grid, setGrid] = useState<any>();
  const { currentOrganization } = useAppSelector(
    (state: RootState) => state.organization
  );

  const url = useParams();
  const localStoragePath = `teleoperation_${currentOrganization.name}_${url.teamName}_${url.roboticsCloudName}_${url.fleetName}_${url.robotName}`;
  const [gridLayout, setGridLayout] = useState<any>(() => {
    if (localStorage.getItem(localStoragePath)) {
      return JSON.parse(
        // @ts-ignore
        localStorage.getItem(localStoragePath)
      );
    }

    return [];
  });
  const [cameraData, setCameraData] = useState<string>("");

  useEffect(() => {
    const grid: any = GridStack.init({
      float: true,
      acceptWidgets: true,
      alwaysShowResizeHandle: true,
      removable: false,
      resizable: {
        handles: "e, se, s, sw, w",
      },
      draggable: {
        handle: ".grid-stack-item-content",
      },
      column: 24,

      //   row: 36,
      //   cellHeight: 25,
    });

    setGrid(grid);

    grid.on("change", function () {
      setTimeout(() => {
        window.localStorage.setItem(
          // @ts-ignore
          localStoragePath,
          JSON.stringify(grid.save(true, true).children)
        );
      }, 1000);
    });
  }, [localStoragePath]);

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

    handleForceUpdate("Teleoperation");
  }

  useEffect(() => {
    setCameraData("");
    // const cameraCompressedTopic = new ROSLIB.Topic({
    //   ros: ros,
    //   name: "/target/compressed",
    //   messageType: "sensor_msgs/msg/CompressedImage",
    // });
    // cameraCompressedTopic?.subscribe(function (message: any) {
    //   setCameraData("data:image/jpg;base64," + message.data);
    // });

    // return () => {
    //   cameraCompressedTopic.unsubscribe();
    // };
  }, []);

  return (
    <Fragment>
      <div
        className="col-span-1 grid-stack grid-stack-24 !h-[55rem] w-full z-0"
        style={{
          backgroundImage: `url(${cameraData})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <GridLayout
          gridLayout={gridLayout}
          ros={ros}
          topicList={topicList}
          localStoragePath={localStoragePath}
          handleRemoveWidget={handleRemoveWidget}
        />
      </div>
      <FloatMenu
        grid={grid}
        type="Teleoperation"
        ros={ros}
        topicList={topicList}
        localStoragePath={localStoragePath}
        handleRemoveWidget={handleRemoveWidget}
        handleForceUpdate={handleForceUpdate}
      />
    </Fragment>
  );
}
