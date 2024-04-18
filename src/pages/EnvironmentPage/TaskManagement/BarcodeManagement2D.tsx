import { ReactElement } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import useBarcode from "../../../hooks/useBarcode";
import BarcodeItem from "../../../components/BarcodeItem/BarcodeItem";

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
        <div className="relative h-full gap-10 bg-white">
          {barcodeItems?.length
            ? barcodeItems?.map((barcodeItem, barcodeItemIndex: number) => {
                return (
                  <BarcodeItem
                    key={barcodeItemIndex}
                    barcodeItem={barcodeItem}
                    barcodeItemIndex={barcodeItemIndex}
                  />
                );
              })
            : ""}
        </div>
        <div className="h-7 w-7 rounded-full bg-primary-500" />
      </TransformComponent>
    </TransformWrapper>
  );
}
