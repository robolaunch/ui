import { ReactElement } from "react";
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
      className={`animate-fadeIn rounded border border-primary-200 bg-light-50 shadow transition-all duration-500 ${className}`}
      openedClassName={`bg-light-50 rounded-md border border-primary-200 !shadow ${className}`}
      trigger={
        <div
          className="h-13 flex w-full !cursor-pointer items-center justify-between p-4"
          onClick={() => handleOpen()}
        >
          <div className="w-full text-sm text-light-700">{header}</div>
          <div
            className={`px-3 transition-all duration-200 hover:scale-110  ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
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
