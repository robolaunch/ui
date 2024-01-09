import { IDetails } from "../../interfaces/robotInterfaces";
import FormInputText from "../FormInputText/FormInputText";
import CFDellButton from "../CFDellButton/CFDellButton";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { ReactElement } from "react";

interface ICFPortInput {
  formik: FormikProps<IDetails>;
  portIndex: number;
  disabled?: boolean;
  type: "ide" | "vdi" | "jupyterNotebook";
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
            case "jupyterNotebook":
              return formik.getFieldProps(
                `services.jupyterNotebook.customPorts.[${portIndex}].name`,
              );
            default:
              return formik.getFieldProps(
                `services.${type}.customPorts.[${portIndex}].name`,
              );
          }
        })()}
        inputError={(() => {
          switch (type) {
            case "jupyterNotebook":
              return formik.errors?.services?.jupyterNotebook?.customPorts?.[
                portIndex
                // @ts-ignore
              ]?.name;
            default:
              return formik.errors?.services?.[`${type}`]?.customPorts?.[
                portIndex
                // @ts-ignore
              ]?.name;
          }
        })()}
        inputTouched={(() => {
          switch (type) {
            case "jupyterNotebook":
              return (
                // @ts-ignore
                formik.touched?.services?.jupyterNotebook?.customPorts?.[
                  portIndex
                ]?.name
              );
            default:
              // @ts-ignore
              return formik.touched?.services?.[`${type}`]?.customPorts?.[
                portIndex
              ]?.name;
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
            case "jupyterNotebook":
              return formik.getFieldProps(
                `services.jupyterNotebook.customPorts[${portIndex}].port`,
              );
            default:
              return formik.getFieldProps(
                `services.${type}.customPorts[${portIndex}].port`,
              );
          }
        })()}
        inputError={(() => {
          switch (type) {
            case "jupyterNotebook":
              return formik.errors?.services?.jupyterNotebook?.customPorts?.[
                portIndex
                // @ts-ignore
              ]?.port;
            default:
              return formik.errors?.services?.[`${type}`]?.customPorts?.[
                portIndex
                // @ts-ignore
              ]?.port;
          }
        })()}
        inputTouched={(() => {
          switch (type) {
            case "jupyterNotebook":
              return (
                // @ts-ignore
                formik.touched?.services?.jupyterNotebook?.customPorts?.[
                  portIndex
                ]?.port
              );
            default:
              // @ts-ignore
              return formik.touched?.services?.[`${type}`]?.customPorts?.[
                portIndex
              ]?.port;
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
              case "jupyterNotebook":
                return formik.values?.services.jupyterNotebook?.customPorts?.[
                  portIndex
                ]?.backendPort;
              default:
                return formik.values?.services?.[type]?.customPorts?.[portIndex]
                  ?.backendPort;
            }
          })()}
        </div>
      </CFInfoBar>

      <div className="flex items-center justify-center pt-2.5 text-sm text-light-800">
        <CFDellButton
          onClick={() => {
            switch (type) {
              case "jupyterNotebook":
                formik.setFieldValue(
                  `services.jupyterNotebook.customPorts`,
                  // @ts-ignore
                  formik.values?.services.jupyterNotebook?.customPorts.filter(
                    (port: any, index: number) => index !== portIndex,
                  ),
                );
                break;
              default:
                formik.setFieldValue(
                  `services.${type}.customPorts`,
                  // @ts-ignore
                  formik.values?.services?.[type].customPorts.filter(
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
