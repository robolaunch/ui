import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import FormInputText from "../FormInputText/FormInputText";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { ReactElement } from "react";

interface ICFPortInput {
  formik: FormikProps<IRobotStep1>;
  portIndex: number;
  disabled?: boolean;
  type: string;
}

export default function CFPortInput({
  formik,
  portIndex,
  disabled,
  type,
}: ICFPortInput): ReactElement {
  return (
    <div className="flex w-full flex-col rounded-md border border-layer-light-100 p-4">
      <div className="flex gap-4 ">
        <FormInputText
          disabled={disabled}
          labelName="Port Name:"
          labelInfoTip="Type a port name."
          inputProps={formik.getFieldProps(
            `${type}CustomPorts[${portIndex}].name`,
          )}
          inputError={
            // @ts-ignore
            formik.errors?.[`${type}CustomPorts`]?.[portIndex]?.name
          }
          inputTouched={
            // @ts-ignore
            formik.touched?.[`${type}CustomPorts`]?.[portIndex]?.name
          }
        />

        <FormInputText
          disabled={disabled}
          labelName="App Port:"
          labelInfoTip="Type a app port."
          inputProps={formik.getFieldProps(
            `${type}CustomPorts[${portIndex}].backendPort`,
          )}
          inputError={
            // @ts-ignore
            formik.errors?.[`${type}CustomPorts`]?.[portIndex]?.backendPort
          }
          inputTouched={
            // @ts-ignore
            formik.touched?.[`${type}CustomPorts`]?.[portIndex]?.backendPort
          }
          type="number"
        />

        <CFInfoBar
          label="Node Port:"
          tip="Is the port that the application is listening on."
          vertical
          classNameContainer="w-32"
        >
          <div className="pt-2.5 text-sm text-layer-light-800">
            :
            {
              // @ts-ignore
              formik.values?.[`${type}CustomPorts`]?.[portIndex]?.port
            }
          </div>
        </CFInfoBar>
      </div>
      <div className="flex items-center justify-center text-sm text-layer-light-800">
        <CreateRobotFormDeleteButton
          text="Delete"
          onClick={() => {
            formik.setFieldValue(
              `${type}CustomPorts`,
              // @ts-ignore
              formik.values?.[`${type}CustomPorts`].filter(
                (port: any, index: number) => index !== portIndex,
              ),
            );
          }}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
