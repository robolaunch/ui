import React, { ReactElement } from "react";
import InfoTip from "../InfoTip/InfoTip";

interface ICreateRobotFormGpuResource {
  formik: any;
  disabled?: boolean;
}

export default function CreateRobotFormGpuResource({
  formik,
  disabled,
}: ICreateRobotFormGpuResource): ReactElement {
  return (
    <div
      data-tut="create-environment-gpu-resource"
      className="flex items-center gap-4"
    >
      <div className="flex gap-2 w-full">
        <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
          GPU Resource: ({formik?.values?.ideGpuResource} Core) :
          <InfoTip content="GPU Resource" />
        </div>
        <input
          min="1"
          max="32"
          type="range"
          autoComplete="off"
          {...formik.getFieldProps("ideGpuResource")}
          className="w-full"
          style={{
            appearance: "auto",
            padding: "0px",
            color: "#AC2DFE",
            accentColor: "currentcolor",
          }}
          disabled={formik.isSubmitting || disabled}
        />
      </div>
    </div>
  );
}
