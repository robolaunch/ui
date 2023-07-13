import React, { ReactElement } from "react";
import Collapsible from "react-collapsible";
import { SlArrowRight } from "react-icons/sl";

interface IAccordion {
  id: number;
  children: ReactElement | ReactElement[];
  header?: ReactElement | string;
  isOpen: boolean;
  handleOpen: () => void;
  className?: string;
}

export default function Accordion({
  id,
  children,
  header,
  isOpen,
  handleOpen,
  className,
}: IAccordion): ReactElement {
  return (
    <Collapsible
      triggerDisabled
      open={isOpen}
      className={`bg-layer-light-50 border border-layer-primary-100 rounded shadow animate__animated animate__fadeIn transition-all duration-500 ${className}`}
      openedClassName={`bg-layer-light-50 rounded-md border border-layer-primary-200 !shadow ${className}`}
      trigger={
        <div
          className="w-full flex items-center justify-between p-4 h-13 !cursor-pointer"
          onClick={() => handleOpen()}
        >
          <div className="w-full text-sm text-layer-dark-700">{header}</div>
          <div
            className={`px-3 hover:scale-110 transition-all duration-200  ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
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
