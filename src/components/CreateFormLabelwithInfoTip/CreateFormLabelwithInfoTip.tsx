import React, { ReactElement } from "react";
import InfoTip from "../InfoTip/InfoTip";

interface ICreateFormLabelwithInfoTip {
  label: string;
  infoTipContent: string;
  children?: ReactElement | ReactElement[];
  vertical?: boolean;
}

export default function CreateFormLabelwithInfoTip({
  label,
  infoTipContent,
  children,
  vertical,
}: ICreateFormLabelwithInfoTip): ReactElement {
  return (
    <div className={`flex ${vertical && "flex-col"}`}>
      <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700">
        {label}
        <InfoTip content={infoTipContent} />
      </div>
      {children}
    </div>
  );
}
