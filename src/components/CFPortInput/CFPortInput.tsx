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
  type: "ide" | "vdi" | "jupyter-notebook";
}

export default function CFPortInput({
  formik,
  portIndex,
  disabled,
  type,
}: ICFPortInput): ReactElement {
  return (
    <div className="flex w-full gap-3 rounded-md border border-light-100 p-4">
      <FormInputText
        disabled={disabled}
        labelName="Port Name:"
        labelInfoTip="Type a port name."
        inputProps={(() => {
          switch (type) {
            case "jupyter-notebook":
              return formik.getFieldProps(
                `jupyterNotebook.customPorts[${portIndex}].name`,
              );
            default:
              return formik.getFieldProps(
                `${type}CustomPorts[${portIndex}].name`,
              );
          }
        })()}
        inputError={(() => {
          switch (type) {
            case "jupyter-notebook":
              return (
                // @ts-ignore
                formik.errors?.jupyterNotebook?.customPorts?.[portIndex]?.name
              );
            default:
              // @ts-ignore
              return formik.errors?.[`${type}CustomPorts`]?.[portIndex]?.name;
          }
        })()}
        inputTouched={(() => {
          switch (type) {
            case "jupyter-notebook":
              return (
                // @ts-ignore
                formik.touched?.jupyterNotebook?.customPorts?.[portIndex]?.name
              );
            default:
              // @ts-ignore
              return formik.touched?.[`${type}CustomPorts`]?.[portIndex]?.name;
          }
        })()}
        classNameContainer="w-1/3"
      />

      <FormInputText
        disabled={disabled}
        labelName="App Port:"
        labelInfoTip="Is the port that the application is listening on."
        inputProps={(() => {
          switch (type) {
            case "jupyter-notebook":
              return formik.getFieldProps(
                `jupyterNotebook.customPorts[${portIndex}].port`,
              );
            default:
              return formik.getFieldProps(
                `${type}CustomPorts[${portIndex}].port`,
              );
          }
        })()}
        inputError={(() => {
          switch (type) {
            case "jupyter-notebook":
              return (
                // @ts-ignore
                formik.errors?.jupyterNotebook?.customPorts?.[portIndex]?.port
              );
            default:
              // @ts-ignore
              return formik.errors?.[`${type}CustomPorts`]?.[portIndex]?.port;
          }
        })()}
        inputTouched={(() => {
          switch (type) {
            case "jupyter-notebook":
              return (
                // @ts-ignore
                formik.touched?.jupyterNotebook?.customPorts?.[portIndex]?.port
              );
            default:
              // @ts-ignore
              return formik.touched?.[`${type}CustomPorts`]?.[portIndex]?.port;
          }
        })()}
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
        <div className="pt-2.5 text-sm text-light-800">
          :
          {(() => {
            switch (type) {
              case "jupyter-notebook":
                return formik.values?.jupyterNotebook?.customPorts?.[portIndex]
                  ?.backendPort;
              default:
                return formik.values?.[`${type}CustomPorts`]?.[portIndex]
                  ?.backendPort;
            }
          })()}
        </div>
      </CFInfoBar>

      <div className="flex items-center justify-center pt-2.5 text-sm text-light-800">
        <CFDellButton
          onClick={() => {
            switch (type) {
              case "jupyter-notebook":
                formik.setFieldValue(
                  `jupyterNotebook.customPorts`,
                  // @ts-ignore
                  formik.values?.jupyterNotebook?.customPorts.filter(
                    (port: any, index: number) => index !== portIndex,
                  ),
                );
                break;
              default:
                formik.setFieldValue(
                  `${type}CustomPorts`,
                  // @ts-ignore
                  formik.values?.[`${type}CustomPorts`].filter(
                    (port: any, index: number) => index !== portIndex,
                  ),
                );
                break;
            }
          }}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
