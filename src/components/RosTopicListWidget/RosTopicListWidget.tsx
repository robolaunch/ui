import React, { ReactElement, useEffect, useState } from "react";
import ROSLIB from "roslib";
import { CiViewList } from "react-icons/ci";
import WidgetLayout from "../../layouts/WidgetLayout";

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
    <WidgetLayout
      id={id}
      type="RosTopicListWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<CiViewList size={26} className="text-layer-light-400" />}
      title="Topic List"
    >
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
    </WidgetLayout>
  );
}
