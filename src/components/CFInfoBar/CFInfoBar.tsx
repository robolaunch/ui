import InputError from "../InputError/InputError";
import InfoTip from "../InfoTip/InfoTip";
import { ReactElement } from "react";

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
      <div className={`flex ${vertical && "flex-col gap-2"}`}>
        <div className="text-light-700 flex min-w-fit gap-1 text-xs font-medium">
          {label}
          <InfoTip content={tip} rightTip={rightTip} />
        </div>
        {children}
      </div>
      {error && touched && <InputError error={error} />}
    </div>
  );
}
