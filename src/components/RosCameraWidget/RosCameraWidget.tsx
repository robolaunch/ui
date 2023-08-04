import React, { Fragment, useEffect, useState } from "react";
import ROSLIB from "roslib";
import InputSelect from "../InputSelect/InputSelect";
import { BsCameraVideo } from "react-icons/bs";
import RosWidgetLayout from "../../layouts/RosWidgetLayout";

const RosCameraWidget = ({
  ros,
  topicList,
  id,
  localStoragePath,
  handleRemoveWidget,
}: any) => {
  const [cameraData, setCameraData] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>(() => {
    try {
      return JSON.parse(localStorage.getItem(localStoragePath) || "")
        [id].content.split('resource="')[1]
        .split('"')[0];
    } catch (error) {
      return "None";
    }
  });

  useEffect(() => {
    setCameraData("");
    const cameraCompressedTopic = new ROSLIB.Topic({
      ros: ros,
      name: selectedTopic,
      messageType: "sensor_msgs/msg/CompressedImage",
    });
    cameraCompressedTopic?.subscribe(function (message: any) {
      setCameraData("data:image/jpg;base64," + message.data);
    });

    return () => {
      cameraCompressedTopic.unsubscribe();
    };
  }, [ros, selectedTopic]);

  return (
    <RosWidgetLayout
      id={id}
      type="RosCameraWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<BsCameraVideo size={24} className="text-layer-light-400" />}
      title={
        <InputSelect
          className="text-xs font-medium text-center h-8 p-0 min-w-[8rem]"
          onChange={(e) => setSelectedTopic(e.target.value)}
          value={selectedTopic}
        >
          <Fragment>
            {selectedTopic === "None" && <option value="None">None</option>}

            {topicList
              ?.filter(
                (topic: any) =>
                  topic?.type === "sensor_msgs/msg/CompressedImage" ||
                  topic?.type === "sensor_msgs/CompressedImage"
              )
              ?.map((topic: any) => {
                return (
                  <option key={topic.name} value={topic.name}>
                    {topic.name}
                  </option>
                );
              })}
          </Fragment>
        </InputSelect>
      }
    >
      <div className="relative w-full h-full" resource={selectedTopic}>
        <img
          className={`absolute inset-0 w-full h-full appearance-none rounded ${
            !cameraData && "scale-[0.25]"
          }`}
          src={cameraData || "/svg/general/loading.svg"}
          alt={cameraData && "Camera"}
        />
      </div>
    </RosWidgetLayout>
  );
};

export default RosCameraWidget;
