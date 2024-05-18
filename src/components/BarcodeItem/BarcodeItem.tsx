import { Fragment } from "react";
import { IBarcodeItem } from "../../interfaces/global/barcode.interface";

import Barcode from "react-barcode";
import useBarcode from "../../hooks/useBarcode";
import { Tooltip } from "@nextui-org/react";
import useRos from "../../hooks/useRos";

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

  const { scale } = useRos();

  return (
    <Fragment key={barcodeItemIndex}>
      <Tooltip
        delay={500}
        content={
          <ul className="rounded bg-primary-950 p-3 text-primary-200">
            {barcodeItem.barcodes
              ?.sort((a, b) => b.location_z - a.location_z)
              .map((barcode, barcodeIndex) => {
                return (
                  <li
                    className="flex items-center justify-between gap-2"
                    key={barcodeIndex}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-700 text-primary-200">
                        {barcode.location_z + 1}
                      </span>
                      <img
                        src="/svg/icons/washing-machine.svg"
                        alt="machine"
                        className="h-8"
                      />
                    </div>
                    <Barcode
                      height={20}
                      width={1}
                      value={barcode.barcode}
                      fontSize={14}
                      lineColor="rgb(220 167 255 / var(--tw-text-opacity))"
                      background={
                        findBarcodeInput &&
                        barcode.barcode.includes(findBarcodeInput)
                          ? "yellow"
                          : "rgb(28 0 46 / var(--tw-bg-opacity))"
                      }
                    />
                    <div className="flex flex-col items-center justify-between text-xs">
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
        }
      >
        <div
          key={barcodeItemIndex}
          className={`absolute flex flex-col gap-1 box-${barcodeItemIndex}`}
          style={{
            backgroundImage: `url(/svg/icons/washing-machine-group.svg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            left: barcodeItem.location_x * scale,
            bottom: barcodeItem.location_y * scale,
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
      </Tooltip>
    </Fragment>
  );
}
