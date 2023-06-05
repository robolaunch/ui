import React, { ReactElement, useState } from "react";
import Accordion from "../Accordion/AccordionV2";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import useCreateRobot from "../../hooks/useCreateRobot";

interface ICreateRobotFormEnvItem {
  formik: any;
  launchStepIndex: number;
  envIndex: number;
}

export default function CreteRobotFormEnvItem({
  formik,
  launchStepIndex,
  envIndex,
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
              {...formik.getFieldProps(
                `robotLaunchSteps.${launchStepIndex}.robotLmEnvs.${envIndex}.name`
              )}
              placeholder="Env Name"
              disabled={formik?.isSubmitting}
            />
            <InputError
              // @ts-ignore
              error={formik?.errors?.robotLaunchSteps?.[launchStepIndex]?.name}
              touched={
                formik?.touched?.robotLaunchSteps?.[launchStepIndex]?.name
              }
            />
          </div>
          <span className="-mt-1.5">=</span>
          <div>
            <InputText
              {...formik.getFieldProps(
                `robotLaunchSteps.${launchStepIndex}.robotLmEnvs.${envIndex}.value`
              )}
              placeholder="Env Value"
              disabled={formik?.isSubmitting}
            />
            <InputError
              // @ts-ignore
              error={formik?.errors?.robotLaunchSteps?.[launchStepIndex]?.value}
              touched={
                formik?.touched?.robotLaunchSteps?.[launchStepIndex]?.value
              }
            />
          </div>
        </div>

        <span
          onClick={() => {
            handleRemoveENVFromLaunchStep(formik, launchStepIndex, envIndex);
          }}
          className="text-[0.66rem] text-red-500 cursor-pointer mx-auto hover:underline"
        >
          Delete this Env
        </span>
      </div>
    </Accordion>
  );
}
