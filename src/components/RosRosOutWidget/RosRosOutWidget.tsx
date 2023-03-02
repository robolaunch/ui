import React, { useEffect, useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { IoMdCodeWorking } from "react-icons/io";
import ROSLIB from "roslib";
import WidgetLayout from "../../layouts/WidgetLayout";

interface IRosRosOutWidget {
  ros: any;
  id: number;
  handleRemoveWidget: (id: number) => void;
}

export default function RosRosOutWidget({
  ros,
  id,
  handleRemoveWidget,
}: IRosRosOutWidget) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const rosoutTopic = new ROSLIB.Topic({
      ros: ros,
      name: "/rosout",
      messageType: "rcl_interfaces/msg/Log",
    });
    rosoutTopic.subscribe(function (message: any) {
      setLogs((prev) => {
        if (prev.length > 50) {
          prev.shift();
        }
        return [...prev, message.msg];
      });
    });
  }, []);

  return (
    <WidgetLayout
      id={id}
      type="RosRosOutWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<IoMdCodeWorking size={26} className="text-layer-light-400" />}
      title="ros_out"
    >
      <div className="flex flex-col gap-2 overflow-auto scrollbar-hide p-2">
        {logs.map((log: string, key: number) => {
          return (
            <div
              key={key}
              className="text-xs flex font-medium py-1.5 border-y border-layer-light-100"
            >
              <div className="text-layer-dark-600">{log}</div>
            </div>
          );
        })}
      </div>
    </WidgetLayout>
  );
}
