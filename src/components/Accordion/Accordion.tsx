import React, { ReactElement } from "react";
import Collapsible from "react-collapsible";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";

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
      className="bg-layer-light-50 border border-layer-light-100 rounded shadow"
      openedClassName="bg-layer-light-50 rounded shadow"
      trigger={
        <div className="w-full flex items-center justify-between p-2 h-11">
          <div className="w-full text-sm text-layer-dark-700">{header}</div>
          <div
            className={`px-3 hover:scale-110  transition-all duration-200 ${
              !isOpen ? "rotate-90" : "rotate-0"
            }`}
            onClick={() => setIsOpen && setIsOpen(isOpen === id ? -1 : id)}
          >
            <SlArrowRight size={12} />
          </div>
        </div>
      }
    >
      <div className="p-2 relative">{children}</div>
    </Collapsible>
  );
}
