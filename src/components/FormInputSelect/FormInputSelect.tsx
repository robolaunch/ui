import React, { Fragment, ReactElement } from "react";
import InfoTip from "../InfoTip/InfoTip";
import InputSelect from "../InputSelect/InputSelect";
import InputError from "../InputError/InputError";

interface IFormInputSelect {
  dataTut?: string;
  labelName: string;
  tip: string;
  inputProps?: any;
  options: ReactElement;
  disabled?: boolean;
  inputError: any;
  inputTouched: any;
  classNameInput?: string;
  classNameContainer?: string;
}

export default function FormInputSelect({
  dataTut,
  labelName,
  tip,
  inputProps,
  options,
  disabled,
  inputError,
  inputTouched,
  classNameInput,
  classNameContainer,
}: IFormInputSelect): ReactElement {
  return (
    <div className={classNameContainer} data-tut={dataTut}>
      <div
        className={`flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700 ${classNameInput}`}
      >
        {labelName}
        <InfoTip content={tip} rightTip />
      </div>
      <InputSelect {...inputProps} disabled={disabled}>
        <Fragment>{options}</Fragment>
      </InputSelect>
      <InputError error={inputError} touched={inputTouched} />
    </div>
  );
}
