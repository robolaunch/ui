import React, { Fragment, ReactElement, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CardLayout from "../../../layouts/CardLayout";
import useBarcodeManagement from "../../../hooks/useBarcodeManagement";
import Barcode from "react-barcode";
import BarcodeManagement3D from "./BarcodeManagement3D";

export default function BarcodeManagement(): ReactElement {
  const [activeTab, setActiveTab] = useState<"2D" | "3D">("3D");
  const { barcodeItems, setBarcodeItems }: any = useBarcodeManagement();

  return (
    <CardLayout className="!relative h-[36rem]">
      <Fragment>
        {activeTab === "2D" ? (
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
                          <div
                            key={barcodeItemIndex}
                            className="flex flex-col gap-1"
                          >
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
        ) : (
          <BarcodeManagement3D />
        )}
      </Fragment>
      <div
        className="absolute bottom-2.5 right-2.5 py-2 px-3 bg-layer-light-100 transition-all duration-300 rounded-lg cursor-pointer"
        onClick={() => setActiveTab(activeTab === "2D" ? "3D" : "2D")}
      >
        {activeTab === "2D" ? "3D" : "2D"}
      </div>
    </CardLayout>
  );
}
