import { ReactElement, useEffect, useState } from "react";
import ROSLIB from "roslib";
import { AiOutlineUnorderedList } from "react-icons/ai";
import RosWidgetLayout from "../../layouts/RosWidgetLayout";

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
  const [topicList, setTopicList] = useState<any>([]);

  useEffect(() => {
    function getTopics() {
      if (ros) {
        const getTopics = new ROSLIB.Service({
          ros: ros,
          name: "/rosapi/topics",
          serviceType: "rosapi/Topics",
        });

        const request = new ROSLIB.ServiceRequest({});
        getTopics.callService(request, async function (result) {
          const resultTopicsList = await result?.topics?.map(
            (topic: string, key: number) => {
              return {
                name: topic,
                type: result?.types[key],
              };
            },
          );

          if (resultTopicsList?.length !== topicList?.length) {
            setTopicList(resultTopicsList);
          }
        });
      }
    }

    getTopics();
    const timer = setInterval(() => getTopics(), 10000);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ros]);

  return (
    <RosWidgetLayout
      id={id}
      type="RosTopicListWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<AiOutlineUnorderedList size={26} className="text-light-400" />}
      title="Topic List"
    >
      <div className="flex flex-col gap-2 overflow-auto p-2 scrollbar-hide">
        {topicList.map((topic: any, key: number) => {
          return (
            <div
              key={key}
              className="flex justify-between border-y border-light-100  py-1.5 text-xs font-medium"
            >
              <div className="text-light-600">{topic.name}</div>
              <div className="text-light-400">{topic.type}</div>
            </div>
          );
        })}
      </div>
    </RosWidgetLayout>
  );
}
