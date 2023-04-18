import React, { Fragment, ReactElement } from "react";
import RosCameraWidget from "../components/RosCameraWidget/RosCameraWidget";
import RosTopicListWidget from "../components/RosTopicListWidget/RosTopicListWidget";
import RosCmdVelWidget from "../components/RosCmdVelWidget/RosCmdVelWidget";
import RosRosOutWidget from "../components/RosRosOutWidget/RosRosOutWidget";
import RosMapWidget from "../components/RosMapWidget/RosMapWidget";
import RosNetworkWidget from "../components/RosNetworkWidget/RosNetworkWidget";
import RosResourceUsageWidget from "../components/RosResourceUsageWidget/RosResourceUsageWidget";
import RosEmergencyControlWidget from "../components/RosEmergencyControlWidget/RosEmergencyControlWidget";
import RosBatteryWidget from "../components/RosBatteryWidget/RosBatteryWidget";
import RosJoystickWidget from "../components/RosJoystickWidget/RosJoystickWidget";
import RosRemoteDesktopWidget from "../components/RosRemoteDesktopWidget/RosRemoteDesktopWidget";
import StreamContext from "../contexts/StreamContext";

interface IGridLayout {
  gridLayout: any;
  ros: any;
  topicList: any;
  localStoragePath: string;
  handleRemoveWidget: any;
  connectionURLs: string[];
}

export function GridLayout({
  gridLayout,
  ros,
  topicList,
  localStoragePath,
  handleRemoveWidget,
  connectionURLs,
}: IGridLayout): ReactElement {
  return (
    <Fragment>
      {gridLayout?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="grid-stack-item"
            gs-w={item.w}
            gs-h={item.h}
            gs-x={item.x}
            gs-y={item.y}
          >
            <div className="grid-stack-item-content">
              {item?.content?.search("RosCameraWidget") > 0 && (
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
              {item.content.search("RosRosOutWidget") > 0 && (
                <RosRosOutWidget
                  id={index}
                  ros={ros}
                  handleRemoveWidget={handleRemoveWidget}
                />
              )}
              {item.content.search("RosMapWidget") > 0 && (
                <RosMapWidget
                  id={index}
                  ros={ros}
                  handleRemoveWidget={handleRemoveWidget}
                />
              )}
              {item.content.search("RosNetworkWidget") > 0 && (
                <RosNetworkWidget
                  id={index}
                  ros={ros}
                  handleRemoveWidget={handleRemoveWidget}
                />
              )}
              {item.content.search("RosResourceUsageWidget") > 0 && (
                <RosResourceUsageWidget
                  id={index}
                  ros={ros}
                  handleRemoveWidget={handleRemoveWidget}
                />
              )}
              {item.content.search("RosEmergencyControlWidget") > 0 && (
                <RosEmergencyControlWidget
                  id={index}
                  ros={ros}
                  handleRemoveWidget={handleRemoveWidget}
                />
              )}
              {item.content.search("RosBatteryWidget") > 0 && (
                <RosBatteryWidget
                  id={index}
                  ros={ros}
                  handleRemoveWidget={handleRemoveWidget}
                />
              )}
              {item.content.search("RosJoystickWidget") > 0 && (
                <RosJoystickWidget
                  id={index}
                  ros={ros}
                  handleRemoveWidget={handleRemoveWidget}
                />
              )}
              {/* {item.content.search("RosRemoteDesktopWidget") > 0 && (
                <StreamContext connectionURLs={connectionURLs}>
                  <RosRemoteDesktopWidget
                    id={index}
                    ros={ros}
                    handleRemoveWidget={handleRemoveWidget}
                  />
                </StreamContext>
              )} */}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
