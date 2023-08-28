import React, { ReactElement } from "react";
import InfoTip from "../InfoTip/InfoTip";

interface ICreateRobotFormIDEGpuResource {
  formik: any;
}

export default function CreateRobotFormIDEGpuResource({
  formik,
}: ICreateRobotFormIDEGpuResource): ReactElement {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2 w-full">
        <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
          IDE GPU Resource: ({formik?.values?.ideGpuResource} Core) :
          {
            // IDE GPU Re
          }
          <InfoTip content="Ide GPU Re" />
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
          disabled={formik.isSubmitting}
        />
      </div>
    </div>
  );
}
