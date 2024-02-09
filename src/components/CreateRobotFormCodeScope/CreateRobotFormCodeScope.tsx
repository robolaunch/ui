import InputCheckbox from "../InputCheckbox/InputCheckbox";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { ReactElement } from "react";
import useMain from "../../hooks/useMain";

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
  const { robotData, selectedState } = useMain();

  return (
    <CFInfoBar
      label="Code Scope:"
      tip="Code Scope"
      dataTut="create-robot-build-step-code-scope"
      vertical
      error={error}
      touched={true}
    >
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
              Physical Instance ({robotData?.step1?.details.name}
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
    </CFInfoBar>
  );
}
