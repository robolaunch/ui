import React, { ReactElement, useEffect, useState } from "react";
import { GridStack } from "gridstack";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";
import { RootState } from "../../../../app/store";
import { GridLayout } from "../../../../layouts/GridLayout";
import { FloatMenu } from "../../../../components/FloatMenu/FloatMenu";
import { handleSaveLayout } from "../../../../helper/gridStack";

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
  const localStoragePath = `visualization_${currentOrganization.name}_${url.teamName}_${url.roboticsCloudName}_${url.fleetName}_${url.robotName}`;

  // @ts-ignore
  const gridLayout = JSON.parse(localStorage.getItem(localStoragePath)) || [];

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
    setTimeout(() => {
      window.localStorage.setItem(
        // @ts-ignore
        localStoragePath,
        JSON.stringify(grid.save(true, true).children)
      );
    }, 500);
  }, [grid, localStoragePath]);

  function handleRemoveWidget(id: any) {
    const localGrid = JSON.parse(
      // @ts-ignore
      localStorage.getItem(localStoragePath)
    );

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
      </div>
      <div className="fixed block  bottom-5 left-1/2 right-1/2 z-10">
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
