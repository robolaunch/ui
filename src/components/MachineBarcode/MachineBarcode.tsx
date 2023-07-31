import React, { ReactElement } from "react";
import Barcode from "react-barcode";

interface IMachineBarcode {
  barcode: string;
}

export default function MachineBarcode({
  barcode,
}: IMachineBarcode): ReactElement {
  return (
    <div className="flex items-center justify-center w-40 h-20 bg-yellow-400 border-[2px] border-layer-dark-800">
      {barcode ? (
        <Barcode
          fontSize={16}
          height={24}
          width={0.5}
          value={barcode}
          background="transparent"
        />
      ) : (
        "None"
      )}
    </div>
  );
}
