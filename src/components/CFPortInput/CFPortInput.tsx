import { IDetails } from "../../interfaces/robotInterfaces";
import FormInputText from "../FormInputText/FormInputText";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { ReactElement } from "react";
import CFDellButton from "../CFDellButton/CFDellButton";

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
    <div className="border-light-100 flex w-full gap-3 rounded-md border p-4">
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
        classNameContainer="w-1/3"
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
        classNameContainer="w-1/3"
      />

      <CFInfoBar
        label="Node Port:"
        tip="Type a node port."
        vertical
        classNameContainer="w-1/3"
        rightTip
      >
        <div className="text-light-800 pt-2.5 text-sm">
          :
          {
            // @ts-ignore
            formik.values?.[`${type}CustomPorts`]?.[portIndex]?.backendPort
          }
        </div>
      </CFInfoBar>

      <div className="text-light-800 flex items-center justify-center pt-2.5 text-sm">
        <CFDellButton
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
