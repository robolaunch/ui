import React, { ReactElement, useEffect, useState } from "react";
import ROSLIB from "roslib";
import { BiTrashAlt } from "react-icons/bi";
import { RxActivityLog } from "react-icons/rx";

interface IRosTopicListWidget {
  ros: any;
  id: number;
  handleRemoveWidget: (id: number) => void;
}

export default function RosTopicListWidget({
  ros,
  id,
  handleRemoveWidget,
}: IRosTopicListWidget): ReactElement {
  const [topicList, setTopicList] = useState<string[]>([]);

  useEffect(() => {
    const getTopics = new ROSLIB.Service({
      ros: ros,
      name: "/rosapi/topics",
      serviceType: "rosapi/Topics",
    });
    // @ts-ignore
    const request = new ROSLIB.ServiceRequest();
    getTopics.callService(request, function (result) {
      result.topics.map((topic: string, key: number) =>
        setTopicList((prev: any) => [
          ...prev,
          { name: topic, type: result.types[key] },
        ])
      );
    });
  }, [ros]);

  return (
    <div
      id="RosTopicListWidget"
      className="flex flex-col gap-3 h-full bg-layer-light-50 rounded-lg p-2"
    >
      <div className="flex justify-between items-center gap-4 ">
        <RxActivityLog size={20} className="text-layer-light-400" />
        <span className="text-sm font-medium  text-layer-dark-700">
          Topic List
        </span>
        <BiTrashAlt
          onClick={() => handleRemoveWidget(id)}
          size={24}
          className="text-layer-light-400"
        />
      </div>
      <div className="flex flex-col gap-2 overflow-auto scrollbar-hide p-2">
        {topicList.map((topic: any, key: number) => {
          return (
            <div
              key={key}
              className="text-xs flex justify-between font-medium  py-1.5 border-y border-layer-light-100"
            >
              <div className="text-layer-dark-600">{topic.name}</div>
              <div className="text-layer-dark-400">{topic.type}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
