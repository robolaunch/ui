import React, { Fragment, ReactElement } from "react";
import RosEmergencyControlWidget from "../components/RosEmergencyControlWidget/RosEmergencyControlWidget";
import RosResourceUsageWidget from "../components/RosResourceUsageWidget/RosResourceUsageWidget";
import RosTopicListWidget from "../components/RosTopicListWidget/RosTopicListWidget";
import RosJoystickWidget from "../components/RosJoystickWidget/RosJoystickWidget";
import RosNetworkWidget from "../components/RosNetworkWidget/RosNetworkWidget";
import RosBatteryWidget from "../components/RosBatteryWidget/RosBatteryWidget";
import RosCameraWidget from "../components/RosCameraWidget/RosCameraWidget";
import RosCmdVelWidget from "../components/RosCmdVelWidget/RosCmdVelWidget";
import RosRosOutWidget from "../components/RosRosOutWidget/RosRosOutWidget";
import RosMapWidget from "../components/RosMapWidget/RosMapWidget";
import { toast } from "sonner";

interface IGridLayout {
  gridLayout: any;
  ros: any;
  topicList: any;
  localStoragePath: string;
  handleRemoveWidget: any;
  connectionURLs: {
    rosURL: string;
    remoteDesktopURL: string;
    ideURL: string;
  };
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
              {(() => {
                try {
                  if (item?.content?.search("RosCameraWidget") > 0) {
                    return (
                      <RosCameraWidget
                        id={index}
                        ros={ros}
                        topicList={topicList}
                        localStoragePath={localStoragePath}
                        handleRemoveWidget={handleRemoveWidget}
                      />
                    );
                  } else if (item.content.search("RosTopicListWidget") > 0) {
                    return (
                      <RosTopicListWidget
                        id={index}
                        ros={ros}
                        handleRemoveWidget={handleRemoveWidget}
                      />
                    );
                  } else if (item.content.search("RosCmdVelWidget") > 0) {
                    return (
                      <RosCmdVelWidget
                        id={index}
                        ros={ros}
                        handleRemoveWidget={handleRemoveWidget}
                      />
                    );
                  } else if (item.content.search("RosRosOutWidget") > 0) {
                    return (
                      <RosRosOutWidget
                        id={index}
                        ros={ros}
                        handleRemoveWidget={handleRemoveWidget}
                      />
                    );
                  } else if (item.content.search("RosMapWidget") > 0) {
                    return (
                      <RosMapWidget
                        id={index}
                        ros={ros}
                        handleRemoveWidget={handleRemoveWidget}
                      />
                    );
                  } else if (item.content.search("RosNetworkWidget") > 0) {
                    return (
                      <RosNetworkWidget
                        id={index}
                        ros={ros}
                        handleRemoveWidget={handleRemoveWidget}
                      />
                    );
                  } else if (
                    item.content.search("RosResourceUsageWidget") > 0
                  ) {
                    return (
                      <RosResourceUsageWidget
                        id={index}
                        ros={ros}
                        handleRemoveWidget={handleRemoveWidget}
                      />
                    );
                  } else if (
                    item.content.search("RosEmergencyControlWidget") > 0
                  ) {
                    return (
                      <RosEmergencyControlWidget
                        id={index}
                        ros={ros}
                        handleRemoveWidget={handleRemoveWidget}
                      />
                    );
                  } else if (item.content.search("RosBatteryWidget") > 0) {
                    return (
                      <RosBatteryWidget
                        id={index}
                        ros={ros}
                        handleRemoveWidget={handleRemoveWidget}
                      />
                    );
                  } else if (item.content.search("RosJoystickWidget") > 0) {
                    return (
                      <RosJoystickWidget
                        id={index}
                        ros={ros}
                        handleRemoveWidget={handleRemoveWidget}
                      />
                    );
                  } else {
                    throw new Error();
                  }
                } catch (error) {
                  localStorage.setItem(localStoragePath, JSON.stringify([]));
                  toast.error(`Error loading widgets, reloading page.`);
                  window.location.reload();
                }
              })()}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
