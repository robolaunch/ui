import React from "react";

interface InterfaceInputError {
  touched: any;
  error: any;
}

const InputError = ({ touched, error }: InterfaceInputError) => {
  return (
    <div className="w-full font-light text-xs text-center pt-1 h-2 text-red">
      {!touched && error && <span className="">{error}</span>}
    </div>
  );
};

export default InputError;
