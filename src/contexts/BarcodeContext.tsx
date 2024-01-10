import { createContext, useEffect, useState } from "react";
import useRobot from "../hooks/useRobot";
import ROSLIB from "roslib";

export const BarcodeContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const { ros } = useRobot();
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
      name: "/barcode",
      messageType: "std_msgs/msg/String",
    });

    ros &&
      barcodes.subscribe(function (message: any) {
        const messageWithScannerId = JSON.parse(message?.data);

        handleBarcodeSetters(messageWithScannerId);
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

  function handleBarcodeSetters(message: any) {
    setBarcodeItems((prevBarcodeItems: any) => {
      const updatedBarcodeItems = [...prevBarcodeItems];

      const barcodeIndex = prevBarcodeItems.findIndex(
        (barcodeItem: any) =>
          barcodeItem.coordinates &&
          Math.sqrt(
            Math.pow(barcodeItem.coordinates.x - message?.coordinates.x, 2) +
              Math.pow(barcodeItem.coordinates.y - message?.coordinates.y, 2),
          ) < 0.02,
      );

      if (barcodeIndex !== -1) {
        updatedBarcodeItems[barcodeIndex] = {
          ...prevBarcodeItems[barcodeIndex],
          barcodes: prevBarcodeItems[barcodeIndex].barcodes.map(
            (barcode: any, index: number) =>
              index === message?.scannerId ? message?.barcode : barcode,
          ),
        };
      } else {
        updatedBarcodeItems.push({
          barcodes: Array.apply(null, Array(3)).map((_, index: number) =>
            index === message?.scannerId ? message?.barcode : "",
          ),
          coordinates: message?.coordinates,
        });
      }

      return updatedBarcodeItems;
    });
  }

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
      value={{ robotLocation, setRobotLocation, barcodeItems, setBarcodeItems }}
    >
      {children}
    </BarcodeContext.Provider>
  );
};
