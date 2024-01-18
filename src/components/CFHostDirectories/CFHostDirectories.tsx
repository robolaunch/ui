import CFDirectoriesInputGroup from "../CFHostDirectoriesInputGroup/CFHostDirectoriesInputGroup";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { IDetails } from "../../interfaces/robotInterfaces";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { FormikProps } from "formik";
import { ReactElement } from "react";

interface ICFDirectories {
  formik: FormikProps<IDetails>;
  disabled?: boolean;
}

export default function CFDirectories({
  formik,
  disabled,
}: ICFDirectories): ReactElement {
  return (
    <div>
      <CFInfoBar
        label="Host Directories:"
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
        onClick={() => {
          formik.setFieldValue("directories.hostDirectories", [
            ...formik.values.directories.hostDirectories,
            {
              hostDirectory: "",
              mountPath: "",
            },
          ]);
        }}
        disabled={disabled}
      />
    </div>
  );
}
