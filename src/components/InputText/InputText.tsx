import React, { useState } from "react";
import { TfiInfoAlt } from "react-icons/tfi";

interface InterfaceInputText {
  labelText: string;
  info: boolean;
  id: string;
  name: string;
  type: string;
  infoText?: string;
  onChange?: any;
  value?: any;
  error?: boolean;
}

const InputText = ({
  labelText,
  info,
  id,
  name,
  type,
  onChange,
  value,
  error,
}: InterfaceInputText) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative">
      <div className="flex gap-2 items-center pb-1">
        <label className="label-text" htmlFor={labelText}>
          {labelText}
        </label>
        {info && (
          <TfiInfoAlt
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
        )}
      </div>
      <input
        placeholder={labelText}
        className="input input-bordered input-primary w-full max-w-xs transition-all"
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
      />
      {hover && (
        <div
          className="absolute bg-gray-50 border border-gray-400 rounded p-1 animate__animated animate__fadeIn"
          style={{ top: "-28px", right: "-20px" }}
        >
          asdasddddddddddddddddd
        </div>
      )}
    </div>
  );
};

export default InputText;
