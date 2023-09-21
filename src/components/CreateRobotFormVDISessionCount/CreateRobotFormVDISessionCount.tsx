import React, { ReactElement } from "react";
import InfoTip from "../InfoTip/InfoTip";

interface ICreateRobotFormVDISessionCount {
  formik: any;
  disabled?: boolean;
}

export default function CreateRobotFormVDISessionCount({
  formik,
  disabled,
}: ICreateRobotFormVDISessionCount): ReactElement {
  return (
    <div
      data-tut="create-environment-vdi-session-count"
      className="flex items-center gap-4"
    >
      <div className="flex w-full gap-2">
        <div className="flex min-w-fit gap-1 text-xs font-medium text-layer-light-700">
          VDI: Session Count ({formik?.values?.remoteDesktop?.sessionCount}{" "}
          User) :
          <InfoTip content="Session Count is the number of simultaneous remote desktop sessions that can be created for the robot. Each session is independent of the other, meaning that each session can be used by a different user. The session count is expandable, meaning that you can increase the session count at any time." />
        </div>
        <input
          min="1"
          max="10"
          type="range"
          autoComplete="off"
          {...formik.getFieldProps("remoteDesktop.sessionCount")}
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
