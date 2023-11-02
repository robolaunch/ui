import InputError from "../InputError/InputError";
import React, { ReactElement } from "react";
import InfoTip from "../InfoTip/InfoTip";

interface ICFInfoBar {
  label: string;
  tip: string;
  error?: string;
  touched?: boolean;
  dataTut?: string;
  children?: ReactElement | ReactElement[];
  classNameContainer?: string;
  vertical?: boolean;
  rightTip?: boolean;
}

export default function CFInfoBar({
  label,
  tip,
  error,
  touched,
  dataTut,
  children,
  classNameContainer,
  vertical,
  rightTip,
}: ICFInfoBar): ReactElement {
  return (
    <div className={`${classNameContainer} transition-300`} data-tut={dataTut}>
      <div className={`flex ${vertical && "flex-col"} `}>
        <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700">
          {label}
          <InfoTip content={tip} rightTip={rightTip} />
        </div>
        {children}
      </div>
      <InputError error={error} touched={touched} />
    </div>
  );
}
