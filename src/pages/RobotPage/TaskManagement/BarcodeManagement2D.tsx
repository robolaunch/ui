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
          className="w-full flex items-center justify-center gap-10 "
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
                              className="flex items-center justify-center w-36 h-44"
                              style={{
                                backgroundImage: `url(/svg/icons/washing-machine.svg)`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                              }}
                            >
                              <div className="flex items-center justify-center w-full h-10 bg-yellow-400 border-[6px] border-layer-dark-800">
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
                        }
                      )}
                    </div>
                  );
                }
              )
            : "No Barcode Item"}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}
