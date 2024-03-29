import CFDirectoriesInputGroup from "../CFHostDirectoriesInputGroup/CFHostDirectoriesInputGroup";
import CreateRobotFormAddButton from "../CFAddButton/CFAddButton";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { FormikProps } from "formik";
import { ReactElement } from "react";
import HostDirectoriesSearchIframe from "../HostDirectoriesSearchIframe/HostDirectoriesSearchIframe";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import { handleAddHostDirectory } from "../../functions/form.directory.host.function";

interface ICFDirectories {
  formik: FormikProps<IEnvironmentStep1>;
  disabled?: boolean;
}

export default function CFDirectories({
  formik,
  disabled,
}: ICFDirectories): ReactElement {
  return (
    <div>
      <CFInfoBar
        label={
          <div className="flex gap-1 text-xs text-light-900">
            <p>Host Directories:</p>
            <HostDirectoriesSearchIframe />
          </div>
        }
        tip="You can link a directory on the host to the directory specified in the application here."
        vertical
      >
        <div className="flex flex-col gap-2">
          {formik.values.directories.hostDirectories?.map((_, index) => {
            return (
              <CFDirectoriesInputGroup
                key={index}
                formik={formik}
                disabled={disabled}
                index={index}
              />
            );
          })}
        </div>
      </CFInfoBar>

      <CreateRobotFormAddButton
        onClick={() => handleAddHostDirectory(formik)}
        disabled={disabled}
      />
    </div>
  );
}
