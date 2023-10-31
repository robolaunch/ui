import InputError from "../InputError/InputError";
import React, { ReactElement } from "react";
import InfoTip from "../InfoTip/InfoTip";

interface ICFInfoBar {
  label: string;
  tip: string;
  error?: boolean | string;
  touched?: boolean;
  dataTut?: string;
  children?: ReactElement | ReactElement[];
  vertical?: boolean;
}

export default function CFInfoBar({
  label,
  tip,
  error,
  touched,
  dataTut,
  children,
  vertical,
}: ICFInfoBar): ReactElement {
  return (
    <div data-tut={dataTut}>
      <div className={`flex ${vertical && "flex-col"}`}>
        <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700">
          {label}
          <InfoTip content={tip} />
        </div>
        {children}
        <InputError error={error} touched={touched} />
      </div>
    </div>
  );
}
