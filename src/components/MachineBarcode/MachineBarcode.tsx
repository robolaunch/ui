import React, { ReactElement } from "react";
import Barcode from "react-barcode";

interface IMachineBarcode {
  barcode: string;
}

export default function MachineBarcode({
  barcode,
}: IMachineBarcode): ReactElement {
  return (
    <div className="border-light-800 flex h-20 w-40 items-center justify-center border-[2px] bg-yellow-400">
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
