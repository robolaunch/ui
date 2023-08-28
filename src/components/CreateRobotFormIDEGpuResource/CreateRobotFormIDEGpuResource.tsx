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
          <InfoTip content="Session Count is the number of simultaneous remote desktop sessions that can be created for the robot. Each session is independent of the other, meaning that each session can be used by a different user. The session count is expandable, meaning that you can increase the session count at any time." />
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
