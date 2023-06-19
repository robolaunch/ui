import React, { ReactElement, useState } from "react";
import Accordion from "../Accordion/AccordionV2";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import useCreateRobot from "../../hooks/useCreateRobot";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";

interface ICreateRobotFormEnvItem {
  formik: any;
  envIndex: number;
  disabled?: boolean;
}

export default function CreteRobotFormEnvItem({
  formik,
  envIndex,
  disabled,
}: ICreateRobotFormEnvItem): ReactElement {
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(false);

  const { handleRemoveENVFromLaunchStep } = useCreateRobot();

  return (
    <Accordion
      key={envIndex}
      id={envIndex}
      isOpen={isShowAccordion}
      handleOpen={() => setIsShowAccordion(!isShowAccordion)}
      header={<span className="font-medium">ENV</span>}
    >
      <div className="flex flex-col gap-7 p-4">
        <div className="flex items-center gap-3">
          <div>
            <InputText
              {...formik.getFieldProps(`robotLmEnvs.[${envIndex}].name`)}
              placeholder="Env Name"
              disabled={disabled}
              className="!text-sm"
            />
            <InputError
              error={formik?.errors?.robotLmEnvs?.[envIndex]?.name}
              // @ts-ignore
              touched={formik?.touched?.robotLmEnvs?.[envIndex]?.name}
            />
          </div>
          <span className="-mt-1.5">=</span>
          <div>
            <InputText
              {...formik.getFieldProps(`robotLmEnvs.[${envIndex}].value`)}
              placeholder="Env Value"
              disabled={disabled}
              className="!text-sm"
            />
            <InputError
              error={formik?.errors?.robotLmEnvs?.[envIndex]?.value}
              // @ts-ignore
              touched={formik?.touched?.robotLmEnvs?.[envIndex]?.value}
            />
          </div>
        </div>

        <CreateRobotFormDeleteButton
          onClick={() => {
            handleRemoveENVFromLaunchStep(formik, envIndex);
          }}
          text="Delete this Env"
          disabled={disabled}
        />
      </div>
    </Accordion>
  );
}
