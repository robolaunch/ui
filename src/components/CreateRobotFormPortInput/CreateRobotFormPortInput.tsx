import { ReactElement } from "react";
import InputText from "../InputText/InputText";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import InputError from "../InputError/InputError";

interface ICreateRobotFormPortInput {
  formik: any;
  portIndex: number;
  disabled?: boolean;
  type: string;
}

export default function CreateRobotFormPortInput({
  formik,
  portIndex,
  disabled,
  type,
}: ICreateRobotFormPortInput): ReactElement {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col">
        <InputText
          inputPlaceholder="Name"
          className="h-9 text-xs"
          {...formik.getFieldProps(`${type}CustomPorts[${portIndex}].name`)}
        />
        <InputError
          touched={formik.touched?.[`${type}CustomPorts`]?.[portIndex]?.name}
          error={formik.errors?.[`${type}CustomPorts`]?.[portIndex]?.name}
          className="h-7"
        />
      </div>

      <div className="flex flex-col">
        <InputText
          type="number"
          inputPlaceholder="Port"
          className="h-9 text-xs"
          {...formik.getFieldProps(`${type}CustomPorts[${portIndex}].port`)}
        />
        <InputError
          touched={formik.touched?.[`${type}CustomPorts`]?.[portIndex]?.port}
          error={formik.errors?.[`${type}CustomPorts`]?.[portIndex]?.port}
          className="h-7"
        />
      </div>

      <div className="pb-7 text-sm text-layer-light-800">
        :{formik.values?.[`${type}CustomPorts`]?.[portIndex]?.backendPort}
      </div>

      <div className="pb-7 text-sm text-layer-light-800">
        <CreateRobotFormDeleteButton
          text="Delete"
          onClick={() => {
            formik.setFieldValue(
              `${type}CustomPorts`,
              formik.values?.[`${type}CustomPorts`].filter(
                (port: any, index: number) => index !== portIndex,
              ),
            );
          }}
        />
      </div>
    </div>
  );
}
