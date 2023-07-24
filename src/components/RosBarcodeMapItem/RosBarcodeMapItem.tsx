import React, { ReactElement, useContext, useState } from "react";
import handleRostoDomMouseCoordinatesConverter from "../../functions/handleRostoDomMouseCoordinatesConverter";
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
      className={`absolute flex flex-col gap-1 z-50 bg-red-500 text-[2px] ${
        isHovered ? "h-fit w-fit rounded" : "h-[4px] w-[4px] rounded-full"
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
      {isHovered ? (
        <div>
          {item?.barcodes?.map((barcode: any, barcodeIndex: number) => {
            return <div key={barcodeIndex}>{barcode}</div>;
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {
            item?.barcodes?.filter((barcode: string) => barcode && barcode)
              .length
          }
        </div>
      )}
    </div>
  );
}
