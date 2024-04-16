import { Fragment, ReactElement } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import useBarcode from "../../../hooks/useBarcode";
import { Tooltip } from "primereact/tooltip";

export default function BarcodeManagement2D(): ReactElement {
  const { barcodeItems } = useBarcode();

  return (
    <TransformWrapper
      centerOnInit={false}
      centerZoomedOut={false}
      limitToBounds={false}
      minScale={0.1}
      maxScale={2}
    >
      <TransformComponent>
        <div
          style={{
            backgroundRepeat: "repeat",
          }}
          className="relative h-full gap-10"
        >
          {barcodeItems?.length
            ? barcodeItems?.map((barcodeItem, barcodeItemIndex: number) => {
                return (
                  <Fragment key={barcodeItemIndex}>
                    <Tooltip target={`.box-${barcodeItemIndex}`}>
                      <ul>
                        {barcodeItem.barcodes?.map((barcode, barcodeIndex) => {
                          return (
                            <li key={barcodeIndex}>
                              <span>{barcode.location_z + 1}</span>
                              <span> - </span>
                              <span>{barcode.barcode}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </Tooltip>
                    <div
                      key={barcodeItemIndex}
                      className={`absolute flex flex-col gap-1 box-${barcodeItemIndex}`}
                      style={{
                        backgroundImage: `url(/svg/icons/washing-machine.svg)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        left: barcodeItem.location_x * 200,
                        top: barcodeItem.location_y * -200,
                        height: "48px",
                        width: "36px",
                        backgroundColor: "#000",
                        transition: "all 0.5s",
                      }}
                    />
                  </Fragment>
                );
              })
            : "No Barcode Item"}
        </div>
        <div className="h-8 w-8 rounded-full bg-primary-500" />
      </TransformComponent>
    </TransformWrapper>
  );
}
