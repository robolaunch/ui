import React, { ReactElement, useEffect, useState } from "react";
import { FloatMenu } from "../../../components/FloatMenu/FloatMenu";
import { handleSaveLayout } from "../../../helpers/gridStack";
import { GridLayout } from "../../../layouts/GridLayout";
import { useParams } from "react-router-dom";
import { GridStack } from "gridstack";
import ROSLIB from "roslib";

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
  const url = useParams();
  const localStoragePath = `visualization_${url?.organizationName}_${url.roboticsCloudName}_${url.instanceName}_${url.fleetName}_${url.robotName}`;
  const gridLayout =
    JSON.parse(localStorage.getItem(localStoragePath) || JSON.stringify([])) ||
    [];

  useEffect(() => {
    const grid: any = GridStack.init({
      float: true,
      acceptWidgets: true,
      alwaysShowResizeHandle: true,
      removable: false,
      resizable: {
        handles: "e, se, s, sw, w",
      },
    });
    setGrid(grid);

    grid.on("change", function () {
      setTimeout(() => {
        handleSaveLayout({ grid, localStoragePath });
      }, 500);
    });
  }, [localStoragePath]);

  useEffect(() => {
    if (grid) {
      setTimeout(() => {
        handleSaveLayout({ grid, localStoragePath });
      }, 500);
    }
  }, [grid, localStoragePath]);

  function handleRemoveWidget(id: any) {
    const localGrid = JSON.parse(
      // @ts-ignore
      localStorage.getItem(localStoragePath)
    );

    // eslint-disable-next-line array-callback-return
    let temp = localGrid.filter((item: any) => {
      if (
        Number(item?.content.split(`item-id="`)[1].split(`"`)[0]) !== Number(id)
      ) {
        return item;
      }
    });

    window.localStorage.setItem(
      // @ts-ignore
      localStoragePath,
      JSON.stringify(temp)
    );

    handleForceUpdate("Visualization");
  }

  useEffect(() => {
    const map = new ROSLIB.Topic({
      ros: ros,
      name: "/map",
      messageType: "nav_msgs/msg/OccupancyGrid",
    });
    map?.subscribe(function (message: any) {
      console.log("map: ", message.info);
    });

    return () => {
      map.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const poseTopic = new ROSLIB.Topic({
      ros: ros,
      name: "/odom_rf2o",
      messageType: "nav_msgs/msg/Odometry",
    });
    poseTopic?.subscribe(function (message: any) {
      // console.log("pose", message.pose.pose.position);
    });

    return () => {
      poseTopic.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 animate__animated animate__fadeIn">
      <div className="col-span-1 grid-stack min-h-[40rem] max-h-[40rem] z-0">
        <GridLayout
          gridLayout={gridLayout}
          ros={ros}
          topicList={topicList}
          localStoragePath={localStoragePath}
          handleRemoveWidget={handleRemoveWidget}
        />
        {gridLayout.length === 0 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-lg font-bold text-gray-400">
              No widgets added, if you want to add widgets, please click the
              button below.
            </div>
          </div>
        )}
      </div>
      <div className="fixed block bottom-5 left-1/2 right-1/2 z-10">
        <FloatMenu
          grid={grid}
          type="Visualization"
          ros={ros}
          topicList={topicList}
          localStoragePath={localStoragePath}
          handleRemoveWidget={handleRemoveWidget}
          handleForceUpdate={handleForceUpdate}
        />
      </div>
    </div>
  );
}
