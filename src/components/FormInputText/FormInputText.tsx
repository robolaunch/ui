import React, { ReactElement } from "react";
import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import InfoTip from "../InfoTip/InfoTip";

interface IFormInputText {
  labelText: string;
  InfoTipText: string;
  formikProps: any;
  disabled?: boolean;
  inputHoverText?: string;
  validationError?: any;
  validationTouched?: any;
}

export default function FormInputText({
  labelText,
  InfoTipText,
  formikProps,
  disabled,
  inputHoverText,
  validationError,
  validationTouched,
}: IFormInputText): ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 min-w-fit text-xs font-medium text-layer-light-700">
        {labelText}
        <InfoTip content={InfoTipText} />
      </div>
      <InputText
        {...formikProps}
        className="!text-sm"
        disabled={disabled}
        inputHoverText={inputHoverText}
      />
      <InputError error={validationError} touched={validationTouched} />
    </div>
  );
}
