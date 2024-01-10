import { createContext, useEffect, useState } from "react";
import useRobot from "../hooks/useRobot";
import ROSLIB from "roslib";

export const BarcodeContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const { ros } = useRobot();
  const [findBarcodeInput, setFindBarcodeInput] = useState<string>("");
  const [robotLocation, setRobotLocation] = useState<{
    x: number;
    y: number;
    z: number;
  }>({
    x: 0,
    y: 0,
    z: 0,
  });
  const [barcodeItems, setBarcodeItems] = useState<any[]>([]);

  useEffect(() => {
    const barcodes = new ROSLIB.Topic({
      ros: ros,
      name: "/all_barcodes",
      messageType: "std_msgs/msg/String",
    });

    ros &&
      barcodes.subscribe(function ({ data }: any) {
        const message = JSON.parse(data);

        setBarcodeItems((prevData: any) => [...prevData, message]);
      });
  }, [ros]);

  useEffect(() => {
    const poseTopic = new ROSLIB.Topic({
      ros: ros,
      name: "/robot_position",
      messageType: "geometry_msgs/msg/PoseStamped",
    });

    ros &&
      poseTopic.subscribe(function (pose: any) {
        setRobotLocation({
          ...pose?.pose?.position,
          z: quaternionToEuler(pose?.pose?.orientation),
        });
      });

    return () => {
      poseTopic?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ros]);

  useEffect(() => {
    console.log(barcodeItems);
  }, [barcodeItems]);

  function quaternionToEuler(q: {
    x: number;
    y: number;
    z: number;
    w: number;
  }) {
    const { x, y, z, w } = q;
    const siny_cosp = 2 * (w * z + x * y);
    const cosy_cosp = 1 - 2 * (y * y + z * z);

    return Math.atan2(siny_cosp, cosy_cosp);
  }

  return (
    <BarcodeContext.Provider
      value={{
        robotLocation,
        setRobotLocation,
        barcodeItems,
        setBarcodeItems,
        findBarcodeInput,
        setFindBarcodeInput,
      }}
    >
      {children}
    </BarcodeContext.Provider>
  );
};
