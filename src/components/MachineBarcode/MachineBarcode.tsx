import { ReactElement } from "react";
import Barcode from "react-barcode";

interface IMachineBarcode {
  barcode: string;
}

export default function MachineBarcode({
  barcode,
}: IMachineBarcode): ReactElement {
  return (
    <div className="flex h-16 w-32 items-center justify-center border-[2px] border-light-800 bg-yellow-400">
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
