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

  const rosBarcode = new ROSLIB.Topic({
    ros: ros,
    name: "/barcode_pose",
    messageType: "std_msgs/msg/String",
  });

  useEffect(() => {
    rosBarcode?.subscribe(function (message: any) {
      console.log(message);
      setBarcodeItems((prev: any) => {
        return [...prev, JSON.parse(message?.data)];
      });

      return () => {
        rosBarcode?.unsubscribe();
      };
    });
  });

  return (
    <div className="absolute inset-0">
      {barcodeItems.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="absolute z-50 bg-red-500 h-fit w-fit text-[6px] rounded p-[1px]"
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
            {item?.barcode}
          </div>
        );
      })}
    </div>
  );
}
