import { ReactElement, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import InputText from "../InputText/InputText";

export default function BarcodeFinder(): ReactElement {
  const [isActiveFinder, setIsActiveFinder] = useState<boolean>(false);

  return (
    <div className="w-fit">
      <PiMagnifyingGlassBold
        size={20}
        onClick={() => setIsActiveFinder(!isActiveFinder)}
      />
      {isActiveFinder && <InputText />}
    </div>
  );
}
