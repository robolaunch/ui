import React, { ReactElement } from "react";
import InfoTip from "../InfoTip/InfoTip";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import InputError from "../InputError/InputError";
import useCreateRobot from "../../hooks/useCreateRobot";
import useSidebar from "../../hooks/useSidebar";

interface ICreateRobotFormCodeScope {
  virtualInstanceOnChange: (e: any) => void;
  isVisiblePhysicalInstanceCheckbox?: boolean;
  physicalInstanceOnChange?: (e: any) => void;
  error: any;
}

export default function CreateRobotFormCodeScope({
  virtualInstanceOnChange,
  isVisiblePhysicalInstanceCheckbox,
  physicalInstanceOnChange,
  error,
}: ICreateRobotFormCodeScope): ReactElement {
  const { robotData } = useCreateRobot();
  const { selectedState } = useSidebar();

  return (
    <div>
      <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
        <span>Code Scope:</span>
        <InfoTip content="Code Scope" />
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs">
            Virtual Instance ({selectedState?.instance?.name}):{" "}
          </span>
          <InputCheckbox onChange={(e) => virtualInstanceOnChange(e)} />
        </div>

        {isVisiblePhysicalInstanceCheckbox && (
          <div className="flex items-center gap-2">
            <span className="text-xs">
              Physical Instance ({robotData?.step1?.physicalInstance?.name}
              ):{" "}
            </span>
            <InputCheckbox
              onChange={(e) =>
                physicalInstanceOnChange && physicalInstanceOnChange(e)
              }
            />
          </div>
        )}
      </div>

      <InputError error={error} touched={true} />
    </div>
  );
}
