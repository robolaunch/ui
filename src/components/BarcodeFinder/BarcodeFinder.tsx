import { ReactElement, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import InputText from "../InputText/InputText";
import useBarcode from "../../hooks/useBarcode";

export default function BarcodeFinder(): ReactElement {
  const [isActiveFinder, setIsActiveFinder] = useState<boolean>(false);

  const { findBarcodeInput, setFindBarcodeInput } = useBarcode();

  return (
    <div
      className={`transition-500 flex items-center justify-between gap-4 rounded bg-light-100  ${
        isActiveFinder ? "w-68 pr-2" : "w-fit"
      }`}
    >
      <div className="flex min-h-9 min-w-9 items-center justify-center">
        <PiMagnifyingGlassBold
          size={20}
          onClick={() => {
            setIsActiveFinder(!isActiveFinder);
            setFindBarcodeInput("");
          }}
        />
      </div>

      {isActiveFinder && (
        <InputText
          onChange={(e) => setFindBarcodeInput(e.target.value)}
          value={findBarcodeInput}
          className="!focus:ring-1 mr-2 !h-6"
        />
      )}
    </div>
  );
}
