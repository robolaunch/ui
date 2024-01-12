import { ReactElement, useState } from "react";
import InputText from "../InputText/InputText";
import useBarcode from "../../hooks/useBarcode";
import { BsSearch } from "react-icons/bs";

export default function BarcodeFinder(): ReactElement {
  const [isActiveFinder, setIsActiveFinder] = useState<boolean>(false);

  const { findBarcodeInput, setFindBarcodeInput } = useBarcode();

  return (
    <div
      className={`transition-500 flex cursor-pointer items-center justify-between gap-2 rounded border border-light-300 bg-light-50 opacity-60 hover:bg-light-100  ${
        isActiveFinder ? "w-80 pr-2" : "w-fit"
      }`}
    >
      <div className="flex min-h-9 min-w-9 items-center justify-center">
        <BsSearch
          size={15}
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
