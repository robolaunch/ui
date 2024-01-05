import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import CFHostDirectoriesInput from "../CFHostDirectoriesInput2/CFHostDirectoriesInput2";
import { IDetails } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { ReactElement } from "react";

interface ICFHostDirectories {
  formik: FormikProps<IDetails>;
  disabled?: boolean;
}

export default function CFHostDirectories({
  formik,
  disabled,
}: ICFHostDirectories): ReactElement {
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
              <CFHostDirectoriesInput
                key={index}
                index={index}
                formik={formik}
                disabled={disabled}
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
        className="!mt-1"
        disabled={disabled}
      />
    </div>
  );
}
