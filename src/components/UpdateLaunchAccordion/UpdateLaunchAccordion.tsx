import React, { ReactElement, useState } from "react";
import Accordion from "../Accordion/AccordionV2";

interface IUpdateLaunchAccordion {
  id: number;
  children: ReactElement;
  header?: ReactElement;
}

export default function UpdateLaunchAccordion({
  id,
  children,
  header,
}: IUpdateLaunchAccordion): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Accordion
      id={id}
      isOpen={isOpen}
      handleOpen={() => setIsOpen(!isOpen)}
      header={header}
    >
      {children}
    </Accordion>
  );
}
