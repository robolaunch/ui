import React, { ReactElement, useEffect, useState } from "react";
import { AiOutlineCode } from "react-icons/ai";
import ScrollToBottom from "react-scroll-to-bottom";
import ROSLIB from "roslib";
import RosWidgetLayout from "../../layouts/RosWidgetLayout";
import { useComponentSize } from "react-use-size";
import { css } from "@emotion/css";
interface IRosCmdVelWidget {
  ros: any;
  id: number;
  handleRemoveWidget: (id: number) => void;
}

export default function RosCmdVelWidget({
  ros,
  id,
  handleRemoveWidget,
}: IRosCmdVelWidget): ReactElement {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const cmdvelTopic = new ROSLIB.Topic({
      ros: ros,
      name: "/cmd_vel",
      messageType: "geometry_msgs/msg/Twist",
    });
    cmdvelTopic.subscribe(function (message: any) {
      setLogs((prev: any) => {
        if (prev.length > 50) {
          prev.shift();
        }
        return [...prev, message];
      });
    });
  }, []);

  const { ref, height, width } = useComponentSize();

  const cssScrollBottom = css({
    height: height,
    width: width,
  });

  return (
    <RosWidgetLayout
      id={id}
      type="RosCmdVelWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<AiOutlineCode size={26} className="text-layer-light-400" />}
      title="cmd_vel"
    >
      <div
        ref={ref}
        className="flex flex-col gap-2 overflow-auto scrollbar-hide p-2"
      >
        <ScrollToBottom className={cssScrollBottom}>
          {logs.map((log: any, key: number) => {
            return (
              <div
                key={key}
                className="text-xs flex font-medium py-1.5 border-y border-layer-light-100"
              >
                <div className="text-layer-dark-600">
                  {`angular: x:${log.angular.x} y:${log.angular.y} z:${log.angular.z} linear: x:${log.linear.x} y:${log.linear.y} z:${log.linear.z}`}
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
    </RosWidgetLayout>
  );
}
