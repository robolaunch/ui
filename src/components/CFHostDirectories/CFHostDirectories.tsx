import { ReactElement } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { FormikProps } from "formik/dist/types";
import { IDetails } from "../../interfaces/robotInterfaces";
import CFHostDirectoriesInput from "../CFHostDirectoriesInput/CFHostDirectoriesInput";

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
        tip="Type a host directories."
        vertical
      >
        <div className="flex flex-col gap-2">
          {formik.values.hostDirectories.map((_, index) => {
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
          formik.setFieldValue("hostDirectories", [
            ...formik.values.hostDirectories,
            {
              hostDirectory: "",
              mountPath: "",
            },
          ]);
        }}
        className="!mt-1"
      />
    </div>
  );
}
