import { createContext, useEffect, useState } from "react";
import useRobot from "../hooks/useRobot";
import ROSLIB from "roslib";
import { IBarcodeItem } from "../interfaces/global/barcode.interface";

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
  const [barcodeItems, setBarcodeItems] = useState<IBarcodeItem[]>([]);

  useEffect(() => {
    const barcodes = new ROSLIB.Topic({
      ros: ros,
      name: "/all_barcodes",
      messageType: "std_msgs/msg/String",
    });

    ros &&
      barcodes.subscribe(function ({ data }: any) {
        const message = JSON.parse(data);

        barcodeClustering(message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function barcodeClustering(newBarcode: IBarcodeItem) {
    const clusteringScale = 0.3;

    setBarcodeItems((prevData: IBarcodeItem[]) => {
      if (prevData.length > 0) {
        const lastItemWaypoint = {
          x: Math.abs(prevData[prevData.length - 1]?.waypoint?.x),
          y: Math.abs(prevData[prevData.length - 1]?.waypoint?.y),
          z: Math.abs(prevData[prevData.length - 1]?.waypoint?.z),
        };

        const newItemWaypoint = {
          x: Math.abs(newBarcode?.waypoint?.x),
          y: Math.abs(newBarcode?.waypoint?.y),
          z: Math.abs(newBarcode?.waypoint?.z),
        };

        const diff = {
          x: Math.abs(lastItemWaypoint.x - newItemWaypoint.x),
          y: Math.abs(lastItemWaypoint.y - newItemWaypoint.y),
          z: Math.abs(lastItemWaypoint.z - newItemWaypoint.z),
        };

        if (diff.x < clusteringScale && diff.y < clusteringScale) {
          return [
            ...prevData,
            {
              robotId: newBarcode.robotId,
              fleetId: newBarcode.fleetId,
              sensorId: newBarcode.sensorId,
              barcode: newBarcode.barcode,
              waypoint: {
                x: prevData[prevData.length - 1]?.waypoint?.x,
                y: prevData[prevData.length - 1]?.waypoint?.y,
                z: newBarcode.waypoint.z,
                yaw: prevData[prevData.length - 1]?.waypoint?.yaw,
              },
            },
          ];
        } else {
          return [...prevData, newBarcode];
        }
      } else {
        // If barcodeItems is initially empty, just return the newBarcode in an array
        return [newBarcode];
      }
    });
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
