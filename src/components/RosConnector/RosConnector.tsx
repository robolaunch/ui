import React, { Fragment, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import ROSLIB from "roslib";
import useRobot from "../../hooks/useRobot";

export default function RosConnector() {
  const { urls } = useAppSelector((state) => state.robot);

  const {
    isSettedCookie,
    ros,
    setRos,
    responseRobot,
    topicList,
    setTopicList,
  } = useRobot();

  useEffect(() => {
    if (
      isSettedCookie &&
      responseRobot &&
      responseRobot?.bridgeIngressEndpoint?.split(":")[0] === "wss"
    ) {
      const ros = new ROSLIB.Ros({
        url: urls?.ros || responseRobot?.bridgeIngressEndpoint,
      });

      setRos(ros);

      ros?.on("connection", function () {
        console.log("Connected to websocket server.");
        console.info("ROSBRIDGE URL: ", ros);
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
      const getTopics = new ROSLIB.Service({
        ros: ros,
        name: "/rosapi/topics",
        serviceType: "rosapi/Topics",
      });
      // @ts-ignore
      const request = new ROSLIB.ServiceRequest();
      getTopics.callService(request, async function (result) {
        const resultTopicsList = await result?.topics?.map(
          (topic: string, key: number) => {
            return {
              name: topic,
              type: result?.types[key],
            };
          }
        );

        if (resultTopicsList?.length !== topicList?.length) {
          setTopicList(resultTopicsList);
        }
      });
    }
  }

  return <></>;
}
