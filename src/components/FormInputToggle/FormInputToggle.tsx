import React from "react";
import InfoTip from "../InfoTip/InfoTip";
import InputToggle from "../InputToggle/InputToggle";

interface IFormInputToggle {
  dataTut?: string;
  labelName: string;
  labelInfoTip: string;
  disabled?: boolean;
  onChange?: any;
  checked: boolean;
}

export default function FormInputToggle({
  dataTut,
  labelName,
  labelInfoTip,
  disabled,
  onChange,
  checked,
}: IFormInputToggle) {
  return (
    <div data-tut={dataTut} className="flex items-center gap-1">
      <div className="flex min-w-fit gap-1 text-xs font-medium text-layer-light-700">
        {labelName}
        <InfoTip content={labelInfoTip} />
      </div>
      <InputToggle disabled={disabled} checked={checked} onChange={onChange} />
    </div>
  );
}
