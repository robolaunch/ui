import React, { Fragment, ReactElement, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { CgTimer } from "react-icons/cg";
import TimeCounter from "../TimeCounter/TimeCounter";

export default function TimerDropdownMenu(): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useOnclickOutside(() => {
    setIsOpen(false);
  });

  return (
    <Fragment>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-center cursor-pointer"
      >
        <CgTimer size={28} />
      </div>
      {isOpen && (
        <div
          className="flex flex-col gap-1 w-[22rem] absolute right-4 top-14 p-2 border border-layer-light-100 bg-layer-light-50 shadow-lg rounded text-sm animate__animated animate__fadeInDown animate__faster"
          ref={ref}
        >
          <TimeCounter hour={0} minute={0} second={0} />
        </div>
      )}
    </Fragment>
  );
}
