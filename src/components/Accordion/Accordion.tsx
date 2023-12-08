import React, { ReactElement } from "react";
import Collapsible from "react-collapsible";
import { SlArrowRight } from "react-icons/sl";

interface IAccordion {
  id: number;
  children: ReactElement;
  header?: ReactElement | string;
  isOpen?: number;
  setIsOpen?: (id: number) => void;
}

export default function Accordion({
  id,
  children,
  header,
  isOpen,
  setIsOpen,
}: IAccordion): ReactElement {
  return (
    <Collapsible
      triggerDisabled
      open={isOpen === id ? true : false}
      className="border-light-100 bg-light-50 rounded border shadow"
      openedClassName="bg-light-50 rounded shadow"
      trigger={
        <div className="flex h-11 w-full items-center justify-between p-2">
          <div className="text-light-700 w-full text-sm">{header}</div>
          <div
            className={`px-3 transition-all  duration-200 hover:scale-110 ${
              !isOpen ? "rotate-90" : "rotate-0"
            }`}
            onClick={() => setIsOpen && setIsOpen(isOpen === id ? -1 : id)}
          >
            <SlArrowRight size={12} />
          </div>
        </div>
      }
    >
      <div className="relative p-2">{children}</div>
    </Collapsible>
  );
}
