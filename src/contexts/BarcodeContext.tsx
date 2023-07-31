import React, { createContext, useEffect, useState } from "react";
import ROSLIB from "roslib";

export const BarcodeContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children, ros }: any) => {
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
    const rosBarcode0 = new ROSLIB.Topic({
      ros: ros,
      name: "/barcode_pose0",
      messageType: "std_msgs/msg/String",
    });

    const rosBarcode1 = new ROSLIB.Topic({
      ros: ros,
      name: "/barcode_pose1",
      messageType: "std_msgs/msg/String",
    });

    const rosBarcode2 = new ROSLIB.Topic({
      ros: ros,
      name: "/barcode_pose2",
      messageType: "std_msgs/msg/String",
    });

    const rosBarcode3 = new ROSLIB.Topic({
      ros: ros,
      name: "/barcode_pose3",
      messageType: "std_msgs/msg/String",
    });

    const rosBarcode4 = new ROSLIB.Topic({
      ros: ros,
      name: "/barcode_pose4",
      messageType: "std_msgs/msg/String",
    });

    const rosBarcode5 = new ROSLIB.Topic({
      ros: ros,
      name: "/barcode_pose5",
      messageType: "std_msgs/msg/String",
    });

    const poseTopic = new ROSLIB.Topic({
      ros: ros,
      name: "/robot_position",
      messageType: "geometry_msgs/msg/PoseStamped",
    });

    rosBarcode0?.subscribe(function (message: any) {
      console.log(message);
      const messageWithScannerId = JSON.parse(message?.data);

      handleBarcodeSetters({
        ...messageWithScannerId,
        scannerId: Number(
          rosBarcode0?.name.charAt(rosBarcode0?.name?.length - 1)
        ),
      });
    });

    rosBarcode1?.subscribe(function (message: any) {
      console.log(message);
      const messageWithScannerId = JSON.parse(message?.data);

      handleBarcodeSetters({
        ...messageWithScannerId,
        scannerId: Number(
          rosBarcode1?.name.charAt(rosBarcode1?.name?.length - 1)
        ),
      });
    });

    rosBarcode2?.subscribe(function (message: any) {
      console.log(message);
      const messageWithScannerId = JSON.parse(message?.data);

      handleBarcodeSetters({
        ...messageWithScannerId,
        scannerId: Number(
          rosBarcode2?.name.charAt(rosBarcode2?.name?.length - 1)
        ),
      });
    });

    rosBarcode3?.subscribe(function (message: any) {
      console.log(message);
      const messageWithScannerId = JSON.parse(message?.data);

      handleBarcodeSetters({
        ...messageWithScannerId,
        scannerId: Number(
          rosBarcode3?.name.charAt(rosBarcode3?.name?.length - 1)
        ),
      });
    });

    rosBarcode4?.subscribe(function (message: any) {
      console.log(message);
      const messageWithScannerId = JSON.parse(message?.data);

      handleBarcodeSetters({
        ...messageWithScannerId,
        scannerId: Number(
          rosBarcode4?.name.charAt(rosBarcode4?.name?.length - 1)
        ),
      });
    });

    rosBarcode5?.subscribe(function (message: any) {
      console.log(message);
      const messageWithScannerId = JSON.parse(message?.data);

      handleBarcodeSetters({
        ...messageWithScannerId,
        scannerId: Number(
          rosBarcode5?.name.charAt(rosBarcode5?.name?.length - 1)
        ),
      });
    });

    poseTopic.subscribe(function (pose: any) {
      console.log(pose);
      setRobotLocation({
        ...pose?.pose?.position,
        z: quaternionToEuler(pose?.pose?.orientation),
      });
    });

    return () => {
      rosBarcode0?.unsubscribe();
      rosBarcode1?.unsubscribe();
      rosBarcode2?.unsubscribe();
      rosBarcode3?.unsubscribe();
      poseTopic?.unsubscribe();
    };
  }, [ros]);

  function quaternionToEuler(q: {
    x: number;
    y: number;
    z: number;
    w: number;
  }) {
    const { x, y, z, w } = q;

    // Yaw (z-axis rotation)
    const siny_cosp = 2 * (w * z + x * y);
    const cosy_cosp = 1 - 2 * (y * y + z * z);
    const yaw = Math.atan2(siny_cosp, cosy_cosp);

    // Convert angles from radians to degrees if desired
    // const rollDeg = roll * (180 / Math.PI);
    // const pitchDeg = pitch * (180 / Math.PI);
    // const yawDeg = yaw * (180 / Math.PI);

    return yaw;
  }

  function handleBarcodeSetters(message: {
    scannerId: number;
    barcode: string;
    coordinates: { x: number; y: number };
  }) {
    setBarcodeItems((prevBarcodeItems: any) => {
      // Bir kopya oluşturarak önceki barcodeItems dizisini güncelleyeceğiz
      const updatedBarcodeItems = [...prevBarcodeItems];

      // message?.coordinates.x ve message?.coordinates.y koordinatlarına göre
      // barcodeItem'ı buluyoruz. Eğer bulunamazsa barcodeIndex -1 olacak.
      const barcodeIndex = prevBarcodeItems.findIndex(
        (barcodeItem: any) =>
          barcodeItem.coordinates &&
          Math.sqrt(
            Math.pow(barcodeItem.coordinates.x - message?.coordinates.x, 2) +
              Math.pow(barcodeItem.coordinates.y - message?.coordinates.y, 2)
          ) < 0.32
      );

      if (barcodeIndex !== -1) {
        updatedBarcodeItems[barcodeIndex] = {
          ...prevBarcodeItems[barcodeIndex],
          barcodes: [
            ...prevBarcodeItems[barcodeIndex].barcodes?.filter(
              (barcode: any) => barcode.id !== message?.scannerId
            ),
            {
              id: message?.scannerId,
              barcode: message?.barcode,
            },
          ]?.sort((a, b) => b.id - a.id),
        };
      } else {
        // Eğer barcodeItem bulunmazsa, yeni bir barcodeItem ekliyoruz.
        updatedBarcodeItems.push({
          barcodes: [
            {
              id: message?.scannerId,
              barcode: message?.barcode,
            },
          ],
          coordinates: message?.coordinates,
        });
      }

      // Güncellenmiş barcodeItems dizisini döndürüyoruz.
      return updatedBarcodeItems;
    });
  }

  return (
    <BarcodeContext.Provider
      value={{ robotLocation, setRobotLocation, barcodeItems, setBarcodeItems }}
    >
      {children}
    </BarcodeContext.Provider>
  );
};
