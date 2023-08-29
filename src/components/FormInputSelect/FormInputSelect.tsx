import React, { ReactElement } from "react";
import InputSelect from "../InputSelect/InputSelect";
import InputError from "../InputError/InputError";
import InfoTip from "../InfoTip/InfoTip";

interface IFormInputSelect {
  labelText: string;
  InfoTipText: string;
  formikProps: any;
  disabled?: boolean;
  validationError?: any;
  validationTouched?: any;
  children?: ReactElement | ReactElement[];
}

export default function FormInputSelect({
  labelText,
  InfoTipText,
  formikProps,
  disabled,
  validationError,
  validationTouched,
  children,
}: IFormInputSelect): ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 min-w-fit text-xs font-medium text-layer-light-700">
        {labelText}
        <InfoTip content={InfoTipText} />
      </div>
      <InputSelect {...formikProps} disabled={disabled}>
        {children}
      </InputSelect>
      <InputError error={validationError} touched={validationTouched} />
    </div>
  );
}
