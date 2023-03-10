import React, { ReactElement, useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";

interface IAccordion {
  id: number;
  children: ReactElement;
  header?: ReactElement | string;
  setActiveMission?: (id: number) => void;
}

export default function Accordion({
  id,
  children,
  header,
  setActiveMission,
}: IAccordion): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setActiveMission?.(isOpen ? id : -1);
  }, [isOpen]);

  return (
    <Collapsible
      triggerDisabled
      open={isOpen}
      className="bg-layer-light-50 border border-layer-light-100 rounded shadow"
      openedClassName="bg-layer-light-50 rounded shadow"
      trigger={
        <div className="w-full flex items-center justify-between p-2 h-11">
          <div className="w-full text-sm text-layer-dark-700">{header}</div>
          <div
            className="px-3 hover:scale-110  transition-all duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <SlArrowDown size={12} /> : <SlArrowRight size={12} />}
          </div>
        </div>
      }
    >
      <div className="p-2">{children}</div>
    </Collapsible>
  );
}
