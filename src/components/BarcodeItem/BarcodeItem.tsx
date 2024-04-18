import { Fragment } from "react";
import { IBarcodeItem } from "../../interfaces/global/barcode.interface";
import { Tooltip } from "primereact/tooltip";

interface IUIBarcodeItem {
  barcodeItem: IBarcodeItem;
  barcodeItemIndex: number;
}

export default function BarcodeItem({
  barcodeItem,
  barcodeItemIndex,
}: IUIBarcodeItem) {
  return (
    <Fragment key={barcodeItemIndex}>
      <Tooltip target={`.box-${barcodeItemIndex}`}>
        <ul className="bg-white text-dark-800">
          {barcodeItem.barcodes
            ?.sort((a, b) => b.location_z - a.location_z)
            .map((barcode, barcodeIndex) => {
              return (
                <li
                  className="flex items-center justify-between"
                  key={barcodeIndex}
                >
                  <img
                    src="/svg/icons/washing-machine.svg"
                    alt="machine"
                    className="h-10"
                  />
                  <div>
                    <span>{barcode.location_z + 1}</span>
                    <span> - </span>
                    <span className="w-48">{barcode.barcode}</span>
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
        }}
      />
    </Fragment>
  );
}
