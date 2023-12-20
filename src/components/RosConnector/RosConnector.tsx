import React, { ReactElement, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import useRobot from "../../hooks/useRobot";
import ROSLIB from "roslib";

export default function RosConnector(): ReactElement {
  const { urls } = useAppSelector((state) => state.robot);

  const {
    isSettedCookie,
    ros,
    setRos,
    responseRobot,
    topicList,
    setTopicList,
    setIsRosConnected,
  } = useRobot();

  useEffect(() => {
    if (
      isSettedCookie &&
      responseRobot?.bridgeIngressEndpoint?.split(":")[0] === "wss"
    ) {
      const ros: ROSLIB.Ros = new ROSLIB.Ros({
        url: urls?.ros || responseRobot?.bridgeIngressEndpoint,
      });

      setRos(ros);

      ros?.on("connection", function () {
        setIsRosConnected(true);
      });
      ros?.on("error", function (error) {
        setIsRosConnected(false);
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
          },
        );

        if (resultTopicsList?.length !== topicList?.length) {
          setTopicList(resultTopicsList);
        }
      });
    }
  }

  return <></>;
}
