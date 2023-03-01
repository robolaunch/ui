import React, { Fragment, useEffect, useState } from "react";
import ROSLIB from "roslib";
import InputSelect from "../InputSelect/InputSelect";
import { BsCameraVideo } from "react-icons/bs";
import { BiTrashAlt } from "react-icons/bi";

const RosCameraWidget = ({
  ros,
  topicList,
  id,
  localStoragePath,
  handleRemoveWidget,
}: any) => {
  const [cameraData, setCameraData] = useState<string>("");
  const [selectableTopic, setSelectableTopic] = useState<any>([]);

  const [selectedTopic, setSelectedTopic] = useState<string>(() => {
    try {
      return JSON.parse(localStorage.getItem(localStoragePath) || "")
        [id].content.split('resource="')[1]
        .split('"')[0];
    } catch (error) {
      return "NONE";
    }
  });

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
    cameraCompressedTopic?.subscribe(function (message: any) {
      setCameraData("data:image/jpg;base64," + message.data);
    });

    return () => {
      cameraCompressedTopic.unsubscribe();
    };
  }, [topicList, ros, selectedTopic]);

  return (
    <div
      resource={String(selectedTopic)}
      id="RosCameraWidget"
      className="flex flex-col gap-2 h-full bg-layer-light-50 rounded-lg p-2"
    >
      <div className="flex justify-between items-center gap-4">
        <BsCameraVideo size={24} className="text-layer-light-400" />

        <InputSelect
          className="text-xs font-medium h-8 p-0"
          onChange={(e) => setSelectedTopic(e.target.value)}
          value={selectedTopic}
        >
          <Fragment>
            {selectableTopic?.map((topic: any) => {
              return (
                <option key={topic.name} value={topic.name}>
                  {topic.name}
                </option>
              );
            })}
          </Fragment>
        </InputSelect>
        <BiTrashAlt
          onClick={() => handleRemoveWidget(id)}
          size={24}
          className="text-layer-light-400"
        />
      </div>
      <img
        className={`w-full h-full appearance-none rounded ${
          !cameraData && "scale-50"
        }`}
        src={cameraData || "/svg/general/loading.svg"}
        alt={cameraData && "Camera"}
      />
    </div>
  );
};

export default RosCameraWidget;
