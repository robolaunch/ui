import React, { ReactElement } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

interface IDropdownMenu {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function DropdownMenu({
  isOpen,
  setIsOpen,
}: IDropdownMenu): ReactElement {
  const ref = useDetectClickOutside({
    onTriggered: (e) => console.log(e),
  });

  return (
    <div className="absolute left-0 top-0 w-12 h-40 bg-red-600" ref={ref}>
      <div>a</div>
    </div>
  );
}
