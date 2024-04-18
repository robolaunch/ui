import { Fragment } from "react";
import { IBarcodeItem } from "../../interfaces/global/barcode.interface";
import { Tooltip } from "primereact/tooltip";
import Barcode from "react-barcode";
import useBarcode from "../../hooks/useBarcode";

interface IUIBarcodeItem {
  barcodeItem: IBarcodeItem;
  barcodeItemIndex: number;
  dragging: boolean;
}

export default function BarcodeItem({
  barcodeItem,
  barcodeItemIndex,
  dragging,
}: IUIBarcodeItem) {
  const { findBarcodeInput } = useBarcode();

  return (
    <Fragment key={barcodeItemIndex}>
      <Tooltip
        className={dragging ? "hidden" : ""}
        disabled={dragging}
        autoHide
        mouseTrack
        target={`.box-${barcodeItemIndex}`}
      >
        <ul className=" bg-white p-4 text-dark-800">
          {barcodeItem.barcodes
            ?.sort((a, b) => b.location_z - a.location_z)
            .map((barcode, barcodeIndex) => {
              return (
                <li
                  className="flex items-center justify-between gap-2 py-2"
                  key={barcodeIndex}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-700 text-white">
                      {barcode.location_z + 1}
                    </span>
                    <img
                      src="/svg/icons/washing-machine.svg"
                      alt="machine"
                      className="h-16"
                    />
                  </div>
                  <Barcode
                    height={40}
                    width={1.25}
                    value={barcode.barcode}
                    fontSize={14}
                    background={
                      findBarcodeInput &&
                      barcode.barcode.includes(findBarcodeInput)
                        ? "yellow"
                        : "#fff"
                    }
                  />
                  <div className="flex flex-col items-center justify-between text-sm">
                    <span className="flex h-6 w-24 items-center justify-center rounded-full bg-primary-700 text-xs text-white">
                      Task ID: {barcode.taskId}
                    </span>
                    <span>
                      {barcode.time
                        ? new Date(barcode.time * 1000).toLocaleString()
                        : "Now"}
                    </span>
                    <div className="flex justify-between gap-1">
                      <span>x: {barcodeItem.location_x.toFixed(2)}</span>
                      <span>y: {barcodeItem.location_y.toFixed(2)}</span>
                      <span>z: {barcode.location_z.toFixed(2)}</span>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </Tooltip>
      <div
        key={barcodeItemIndex}
        className={`absolute flex flex-col gap-1 box-${barcodeItemIndex}`}
        style={{
          backgroundImage: `url(/svg/icons/washing-machine-group.svg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          left: barcodeItem.location_x * 100,
          top: barcodeItem.location_y * -100,
          height: "44px",
          width: "36px",
          transition: "all 0.5s",
          opacity: findBarcodeInput
            ? barcodeItem.barcodes
                ?.map((item) => item.barcode)
                .some((barcode) => barcode.includes(findBarcodeInput))
              ? 1
              : 0.5
            : 1,
        }}
      />
    </Fragment>
  );
}
