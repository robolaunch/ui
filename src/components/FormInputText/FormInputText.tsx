import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import InfoTip from "../InfoTip/InfoTip";
import { ReactElement } from "react";

interface IFormInputText {
  dataTut?: string;
  labelName: string;
  labelInfoTip: string;
  rightTip?: boolean;
  type?: string;
  inputProps?: any;
  disabled?: boolean;
  inputHoverText?: string;
  inputError?: string;
  inputTouched?: boolean;
  classNameInput?: string;
  classNameContainer?: string;
}

export default function FormInputText({
  dataTut,
  labelName,
  labelInfoTip,
  rightTip,
  type,
  inputProps,
  disabled,
  inputHoverText,
  inputError,
  inputTouched,
  classNameInput,
  classNameContainer,
}: IFormInputText): ReactElement {
  return (
    <div data-tut={dataTut} className={classNameContainer}>
      <div
        className={`flex min-w-fit gap-1 pb-3 text-xs font-medium text-light-700 ${classNameInput}`}
      >
        {labelName}
        <InfoTip content={labelInfoTip} rightTip={rightTip} />
      </div>
      <InputText
        {...inputProps}
        disabled={disabled}
        inputHoverText={inputHoverText}
        type={type}
      />
      <InputError error={inputError} touched={inputTouched} />
    </div>
  );
}
