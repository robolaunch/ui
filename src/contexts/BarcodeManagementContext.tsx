import React, { createContext, useEffect, useState } from "react";
import ROSLIB from "roslib";

export const BarcodeManagementContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children, ros }: any) => {
  const [barcodeItems, setBarcodeItems] = useState<any[]>([
    {
      barcodes: ["123", "321", ""],
      coordinates: { x: -1, y: 1 },
    },
    {
      barcodes: ["ASD", "", "DSA"],
      coordinates: { x: -1, y: 2 },
    },
    {
      barcodes: ["ASD", "", "DSA"],
      coordinates: { x: -1, y: 3 },
    },
    {
      barcodes: ["ASD", "", "DSA"],
      coordinates: { x: 1, y: 1 },
    },
    {
      barcodes: ["ASD", "", "DSA"],
      coordinates: { x: 1, y: 2 },
    },
    {
      barcodes: ["ASD", "", "DSA"],
      coordinates: { x: 1, y: 3 },
    },
  ]);

  // useEffect(() => {
  //   const a = Array.apply(null, Array(1000)).map((_, index: number) => {
  //     return {
  //       barcodes: ["ASD", "", "DSA"],
  //       coordinates: { x: index, y: index },
  //     };
  //   });

  //   setBarcodeItems(a);
  // }, []);

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

  useEffect(() => {
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

    return () => {
      rosBarcode0?.unsubscribe();
      rosBarcode1?.unsubscribe();
      rosBarcode2?.unsubscribe();
      rosBarcode3?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBarcodeSetters(message: any) {
    setBarcodeItems((prevBarcodeItems: any) => {
      const updatedBarcodeItems = [...prevBarcodeItems];

      const barcodeIndex = prevBarcodeItems.findIndex(
        (barcodeItem: any) =>
          barcodeItem.coordinates &&
          Math.sqrt(
            Math.pow(barcodeItem.coordinates.x - message?.coordinates.x, 2) +
              Math.pow(barcodeItem.coordinates.y - message?.coordinates.y, 2)
          ) < 0.02
      );

      if (barcodeIndex !== -1) {
        updatedBarcodeItems[barcodeIndex] = {
          ...prevBarcodeItems[barcodeIndex],
          barcodes: prevBarcodeItems[barcodeIndex].barcodes.map(
            (barcode: any, index: number) =>
              index === message?.scannerId ? message?.barcode : barcode
          ),
        };
      } else {
        updatedBarcodeItems.push({
          barcodes: Array.apply(null, Array(3)).map((_, index: number) =>
            index === message?.scannerId ? message?.barcode : ""
          ),
          coordinates: message?.coordinates,
        });
      }

      return updatedBarcodeItems;
    });
  }

  return (
    <BarcodeManagementContext.Provider
      value={{ barcodeItems, setBarcodeItems }}
    >
      {children}
    </BarcodeManagementContext.Provider>
  );
};
