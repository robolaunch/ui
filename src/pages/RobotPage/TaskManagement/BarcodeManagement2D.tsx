import React, { ReactElement } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import useBarcode from "../../../hooks/useBarcode";
import Barcode from "react-barcode";

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
          className="flex w-full items-center justify-center gap-10 "
        >
          {barcodeItems?.length
            ? barcodeItems?.map(
                (barcodeItem: any, barcodeItemIndex: number) => {
                  return (
                    <div key={barcodeItemIndex} className="flex flex-col gap-1">
                      {barcodeItem?.barcodes?.map(
                        (barcode: any, barcodeIndex: number) => {
                          return (
                            <div
                              key={barcodeIndex}
                              className="flex h-44 w-36 items-center justify-center"
                              style={{
                                backgroundImage: `url(/svg/icons/washing-machine.svg)`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                              }}
                            >
                              <div className="border-light-800 flex h-10 w-full items-center justify-center border-[6px] bg-yellow-400">
                                {barcode ? (
                                  <Barcode
                                    fontSize={8}
                                    height={8}
                                    width={0.5}
                                    value={barcode}
                                    background="transparent"
                                  />
                                ) : (
                                  <span className="text-xs">None</span>
                                )}
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  );
                },
              )
            : "No Barcode Item"}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}
