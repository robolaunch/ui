import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import { IDetails } from "../../interfaces/robotInterfaces";
import FormInputText from "../FormInputText/FormInputText";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { ReactElement } from "react";

interface ICFPortInput {
  formik: FormikProps<IDetails>;
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
          labelInfoTip="Is the port that the application is listening on."
          inputProps={formik.getFieldProps(
            `${type}CustomPorts[${portIndex}].port`,
          )}
          inputError={
            // @ts-ignore
            formik.errors?.[`${type}CustomPorts`]?.[portIndex]?.port
          }
          inputTouched={
            // @ts-ignore
            formik.touched?.[`${type}CustomPorts`]?.[portIndex]?.port
          }
          type="number"
          rightTip
        />

        <CFInfoBar
          label="Node Port:"
          tip="Type a node port."
          vertical
          classNameContainer="w-32"
          rightTip
        >
          <div className="pt-2.5 text-sm text-layer-light-800">
            :
            {
              // @ts-ignore
              formik.values?.[`${type}CustomPorts`]?.[portIndex]?.backendPort
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
