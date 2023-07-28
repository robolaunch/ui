import React, { Fragment, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import ROSLIB from "roslib";

interface IRosConnector {
  isSettedCookie: boolean;
  ros: any;
  setRos: any;
  responseRobot: any;
  setTopicList: any;
}

export default function RosConnector({
  isSettedCookie,
  ros,
  setRos,
  responseRobot,
  setTopicList,
}: IRosConnector) {
  const { urls } = useAppSelector((state) => state.robot);

  useEffect(() => {
    if (isSettedCookie && responseRobot) {
      const ros = new ROSLIB.Ros({
        url:
          urls?.ros ||
          responseRobot?.bridgeIngressEndpoint ||
          "ws://localhost:9090",
      });

      setRos(ros);

      ros?.on("connection", function () {
        console.log("Connected to websocket server.");
        console.info("ROSBRIDGE URL: ", urls?.ros);
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
  }, [responseRobot, urls?.ros, isSettedCookie]);

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
      setTopicList([]);
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

  return <></>;
}
