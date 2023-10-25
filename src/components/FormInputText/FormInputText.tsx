import React, { ReactElement } from "react";
import InfoTip from "../InfoTip/InfoTip";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";

interface IFormInputText {
  dataTut?: string;
  labelName: string;
  labelInfoTip: string;
  inputProps?: any;
  disabled?: boolean;
  inputHoverText?: string;
  inputError: any;
  inputTouched: any;
  classNameInput?: string;
  classNameContainer?: string;
}

export default function FormInputText({
  dataTut,
  labelName,
  labelInfoTip,
  inputProps,
  disabled,
  inputHoverText,
  inputError,
  inputTouched,
  classNameInput,
  classNameContainer,
}: IFormInputText): ReactElement {
  return (
    <div className={classNameContainer} data-tut={dataTut}>
      <div
        className={`flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700 ${classNameInput}`}
      >
        {labelName}
        <InfoTip content={labelInfoTip} />
      </div>
      <InputText
        {...inputProps}
        className="!text-sm"
        disabled={disabled}
        inputHoverText={inputHoverText}
      />
      <InputError error={inputError} touched={inputTouched} />
    </div>
  );
}
