import React, { ReactElement } from "react";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import InputError from "../InputError/InputError";
import useCreateRobot from "../../hooks/useCreateRobot";
import useMain from "../../hooks/useMain";
import InfoTip from "../InfoTip/InfoTip";

interface ICreateRobotFormCodeScope {
  virtualInstanceChecked?: boolean;
  physicalInstanceChecked?: boolean;
  virtualInstanceDisabled?: boolean;
  physicalInstanceDisabled?: boolean;
  virtualInstanceOnChange: (e: any) => void;
  isVisiblePhysicalInstanceCheckbox?: boolean;
  physicalInstanceOnChange?: (e: any) => void;
  error: any;
}

export default function CreateRobotFormCodeScope({
  virtualInstanceChecked,
  physicalInstanceChecked,
  virtualInstanceDisabled,
  physicalInstanceDisabled,
  virtualInstanceOnChange,
  isVisiblePhysicalInstanceCheckbox,
  physicalInstanceOnChange,
  error,
}: ICreateRobotFormCodeScope): ReactElement {
  const { robotData } = useCreateRobot();
  const { selectedState } = useMain();

  return (
    <div data-tut="create-robot-build-step-scope">
      <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
        <span>Code Scope:</span>
        <InfoTip content="Code Scope" />
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs">
            Cloud Instance ({selectedState?.instance?.name}):{" "}
          </span>
          <InputCheckbox
            value={virtualInstanceChecked}
            onChange={(e) => virtualInstanceOnChange(e)}
            disabled={virtualInstanceDisabled}
          />
        </div>

        {isVisiblePhysicalInstanceCheckbox && (
          <div className="flex items-center gap-2">
            <span className="text-xs">
              Physical Instance ({robotData?.step1?.physicalInstanceName}
              ):{" "}
            </span>
            <InputCheckbox
              value={physicalInstanceChecked}
              onChange={(e) =>
                physicalInstanceOnChange && physicalInstanceOnChange(e)
              }
              disabled={physicalInstanceDisabled}
            />
          </div>
        )}
      </div>

      <InputError error={error} touched={true} />
    </div>
  );
}
