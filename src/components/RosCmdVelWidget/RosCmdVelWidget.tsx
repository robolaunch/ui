import React, { ReactElement, useEffect, useState } from "react";
import { RxActivityLog } from "react-icons/rx";
import { BiTrashAlt } from "react-icons/bi";
import ROSLIB from "roslib";

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

  return (
    <div
      id="RosCmdVelWidget"
      className="flex flex-col gap-3 h-full bg-layer-light-50 rounded-lg p-2"
    >
      <div className="flex justify-between items-center gap-4 ">
        <RxActivityLog size={20} className="text-layer-light-400" />
        <span className="text-sm font-medium  text-layer-dark-700">
          cmd_vel
        </span>
        <BiTrashAlt
          onClick={() => handleRemoveWidget(id)}
          size={24}
          className="text-layer-light-400"
        />
      </div>
      <div className="flex flex-col gap-2 overflow-auto scrollbar-hide p-2">
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
      </div>
    </div>
  );
}
