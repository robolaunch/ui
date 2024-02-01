import InputToggle from "../InputToggle/InputToggle";
import InfoTip from "../InfoTip/InfoTip";
import { ReactElement } from "react";

interface ICFInputToggle {
  dataTut?: string;
  labelName: string;
  labelInfoTip: string;
  disabled?: boolean;
  onChange?: any;
  checked: boolean;
  rightTip?: boolean;
}

export default function CFInputToggle({
  dataTut,
  labelName,
  labelInfoTip,
  disabled,
  onChange,
  checked,
  rightTip,
}: ICFInputToggle): ReactElement {
  return (
    <div data-tut={dataTut} className="flex items-center gap-1">
      <div className="flex min-w-fit gap-1 text-xs font-medium text-light-700">
        {labelName}
        <InfoTip content={labelInfoTip} rightTip={rightTip} />
      </div>
      <InputToggle disabled={disabled} checked={checked} onChange={onChange} />
    </div>
  );
}
