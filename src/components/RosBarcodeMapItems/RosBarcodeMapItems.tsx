import React, { ReactElement, useContext, useEffect, useState } from "react";
import { TaskManagementContext } from "../../contexts/TaskManagementContext";
import handleRostoDomMouseCoordinatesConverter from "../../helpers/handleRostoDomMouseCoordinatesConverter";
import ROSLIB from "roslib";

interface IRosBarcodeMap {
  ros: any;
}

export default function RosBarcodeMapItems({
  ros,
}: IRosBarcodeMap): ReactElement {
  const [barcodeItems, setBarcodeItems] = useState<any[]>([]);

  const { rosMapDetails }: any = useContext(TaskManagementContext);

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
          barcodeItem.coordinates.x.toFixed(2) ===
            message?.coordinates.x.toFixed(2) &&
          barcodeItem.coordinates.y.toFixed(2) ===
            message?.coordinates.y.toFixed(2)
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
          barcodes: ["", "", "", ""].map((_, index: number) =>
            index === message?.scannerId ? message?.barcode : ""
          ),
          coordinates: message?.coordinates,
        });
      }

      return updatedBarcodeItems;
    });
  }

  useEffect(() => {
    console.log("barcodeItems", barcodeItems);
  }, [barcodeItems]);

  return (
    <div className="absolute inset-0">
      {barcodeItems.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="absolute flex flex-col gap-1 z-50 bg-red-500 h-fit w-fit text-[4px] rounded"
            style={{
              left:
                handleRostoDomMouseCoordinatesConverter({
                  rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
                  rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
                  rosMapWidth: rosMapDetails?.x,
                  rosMapHeight: rosMapDetails?.y,
                  waypointX: item?.coordinates?.x,
                  waypointY: item?.coordinates?.y,
                }).x - 20,
              top:
                handleRostoDomMouseCoordinatesConverter({
                  rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
                  rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
                  rosMapWidth: rosMapDetails?.x,
                  rosMapHeight: rosMapDetails?.y,
                  waypointX: item?.coordinates?.x,
                  waypointY: item?.coordinates?.y,
                }).y - 12,
            }}
          >
            <div>
              {item?.barcodes?.map((barcode: any, barcodeIndex: number) => {
                return <div key={barcodeIndex}>{barcode}</div>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
