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
        className="flex cursor-pointer items-center justify-center"
      >
        <CgTimer size={28} />
      </div>
      {isOpen && (
        <div
          className="animate__animated animate__fadeInDown animate__faster border-light-100 bg-light-50 absolute right-4 top-14 flex w-[22rem] flex-col gap-1 rounded border p-2 text-sm shadow-lg"
          ref={ref}
        >
          <TimeCounter hour={0} minute={0} second={0} />
        </div>
      )}
    </Fragment>
  );
}
