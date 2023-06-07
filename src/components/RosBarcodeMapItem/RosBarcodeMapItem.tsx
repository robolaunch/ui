import React, { ReactElement, useContext, useState } from "react";
import handleRostoDomMouseCoordinatesConverter from "../../helpers/handleRostoDomMouseCoordinatesConverter";
import { TaskManagementContext } from "../../contexts/TaskManagementContext";

interface IRosBarcodeMapItem {
  item: any;
}

export default function RosBarcodeMapItem({
  item,
}: IRosBarcodeMapItem): ReactElement {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const { rosMapDetails }: any = useContext(TaskManagementContext);

  return (
    <div
      className={`absolute flex flex-col gap-1 z-50 bg-red-500 text-[4px] ${
        isHovered ? "h-1 w-1 rounded-full" : "h-fit w-fit rounded"
      }`}
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div>
          {item?.barcodes?.map((barcode: any, barcodeIndex: number) => {
            return <div key={barcodeIndex}>{barcode}</div>;
          })}
        </div>
      )}
    </div>
  );
}
