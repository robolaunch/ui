import React, { Fragment, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import ROSLIB from "roslib";
import HiddenFrames from "../HiddenFrames/HiddenFrames";

interface IRosConnector {
  ros: any;
  setRos: any;
  responseRobot: any;
  setTopicList: any;
}

export default function RosConnector({
  ros,
  setRos,
  responseRobot,
  setTopicList,
}: IRosConnector) {
  const { urls } = useAppSelector((state) => state.robot);
  const [isSettedCookie, setIsSettedCookie] = useState<boolean>(false);

  useEffect(() => {
    if (isSettedCookie) {
      const ros = new ROSLIB.Ros({
        url:
          urls?.ros ||
          responseRobot?.bridgeIngressEndpoint ||
          "ws://localhost:9090",
      });

      setRos(ros);

      ros?.on("connection", function () {
        console.log("Connected to websocket server.");
      });
      ros?.on("error", function (error) {
        console.warn("Error connecting to websocket server: ", error);
      });
      ros?.on("close", function () {
        console.log("Connection to websocket server closed.");
      });
    }

    return () => {
      ros?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseRobot, urls?.ros]);

  useEffect(() => {
    getTopics();

    const timer = setInterval(() => {
      getTopics();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ros]);

  function getTopics() {
    if (ros && isSettedCookie) {
      const getTopics = new ROSLIB.Service({
        ros: ros,
        name: "/rosapi/topics",
        serviceType: "rosapi/Topics",
      });
      // @ts-ignore
      const request = new ROSLIB.ServiceRequest();
      getTopics.callService(request, function (result) {
        result?.topics?.map((topic: string, key: number) =>
          setTopicList((prev: any) => [
            ...prev,
            { name: topic, type: result?.types[key] },
          ])
        );
      });
    }
  }

  return (
    <Fragment>
      <HiddenFrames
        url={responseRobot?.ideIngressEndpoint}
        type="ide"
        onLoad={() => {
          setIsSettedCookie(true);
        }}
      />
    </Fragment>
  );
}
