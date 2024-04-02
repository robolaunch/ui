import { Fragment, ReactElement, useEffect, useState } from "react";
import TeleoperationControlBar from "../../../components/TeleoperationControlBar/TeleoperationControlBar";
import RemoteDesktopScene from "../../../components/RemoteDesktopScene/RemoteDesktopScene";
import { FloatMenu } from "../../../components/FloatMenu/FloatMenu";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { handleSaveLayout } from "../../../helpers/gridStack";
import StreamContext from "../../../contexts/VDIContext";
import { GridLayout } from "../../../layouts/GridLayout";
import { useParams } from "react-router-dom";
import "gridstack/dist/gridstack-extra.css";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import ROSLIB from "roslib";
import useRobot from "../../../hooks/useRobot";
import Card from "../../../components/Card/Card";

export default function Teleoperation(): ReactElement {
  const [grid, setGrid] = useState<any>();
  const url = useParams();
  const localStoragePath = `teleoperation_${url?.organizationName}_${url.roboticsCloudName}_${url.instanceName}_${url.fleetName}_${url.robotName}`;
  const gridLayout =
    JSON.parse(localStorage.getItem(localStoragePath) || JSON.stringify([])) ||
    [];
  const [cameraData, setCameraData] = useState<string>("");
  const [isRemoteDesktopStream, setIsRemoteDesktopStream] =
    useState<any>(undefined);
  const [selectableTopic, setSelectableTopic] = useState<any>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const handleFullScreen = useFullScreenHandle();
  const { ros, topicList, handleForceUpdate } = useRobot();

  // GRID
  useEffect(() => {
    const grid: any = GridStack.init({
      float: true,
      acceptWidgets: true,
      alwaysShowResizeHandle: true,
      removable: false,
      resizable: {
        handles: "e, se, s, sw, w",
      },
      row: 20,
      cellHeight: 50,
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

  function handleRemoveWidget(id: number) {
    const localGrid = JSON.parse(
      // @ts-ignore
      localStorage.getItem(localStoragePath),
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
      JSON.stringify(temp),
    );

    handleForceUpdate("Teleoperation");
  }
  // GRID

  useEffect(() => {
    setSelectableTopic([]);
    topicList?.map((topic: any) => {
      if (topic.type === "sensor_msgs/msg/CompressedImage") {
        setSelectableTopic((prev: any) => [...prev, topic]);
      }
      return null;
    });
  }, [topicList]);

  useEffect(() => {
    setCameraData("");
    const cameraCompressedTopic = new ROSLIB.Topic({
      ros: ros,
      name: selectedTopic,
      messageType: "sensor_msgs/msg/CompressedImage",
    });

    if (!isRemoteDesktopStream) {
      ros &&
        cameraCompressedTopic?.subscribe(function (message: any) {
          setCameraData("data:image/jpg;base64," + message.data);
        });
    }

    return () => {
      cameraCompressedTopic.unsubscribe();
    };
  }, [isRemoteDesktopStream, selectedTopic, ros]);

  useEffect(() => {
    if (localStorage.getItem("layout_" + localStoragePath)) {
      const { selectedTopic, isRemoteDesktopStream } = JSON.parse(
        // @ts-ignore
        localStorage.getItem("layout_" + localStoragePath),
      );

      setSelectedTopic(selectedTopic);
      setIsRemoteDesktopStream(isRemoteDesktopStream);
    }
  }, [localStoragePath]);

  useEffect(() => {
    localStorage.setItem(
      "layout_" + localStoragePath,
      JSON.stringify({
        selectedTopic: selectedTopic,
        isRemoteDesktopStream: isRemoteDesktopStream,
      }),
    );
  }, [selectedTopic, isRemoteDesktopStream, localStoragePath]);

  return (
    <Card>
      <Fragment>
        <FullScreen className="relative" handle={handleFullScreen}>
          <div
            className="grid-stack animate-fadeIn z-0 col-span-1 w-full rounded bg-light-900"
            style={{
              height: handleFullScreen.active ? "100vh" : "unset",
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
            {isRemoteDesktopStream && (
              <StreamContext>
                <div className="absolute inset-0 -z-10">
                  <RemoteDesktopScene isControllerActive={false} />
                </div>
              </StreamContext>
            )}
          </div>

          <TeleoperationControlBar
            selectedTopic={selectedTopic}
            selectableTopic={selectableTopic}
            setSelectedTopic={setSelectedTopic}
            isRemoteDesktopStream={isRemoteDesktopStream}
            setIsRemoteDesktopStream={setIsRemoteDesktopStream}
            handleFullScreen={handleFullScreen}
          />
        </FullScreen>

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
    </Card>
  );
}
