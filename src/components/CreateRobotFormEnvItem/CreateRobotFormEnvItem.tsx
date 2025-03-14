import { ReactElement, useState } from "react";
import Accordion from "../Accordion/AccordionV2";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import InfoTip from "../InfoTip/InfoTip";
import { handleRemoveEnv } from "../../functions/form.env.function";

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

  return (
    <Accordion
      key={envIndex}
      id={envIndex}
      isOpen={isShowAccordion}
      handleOpen={() => setIsShowAccordion(!isShowAccordion)}
      header={<span className="font-medium">ENV</span>}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-light-700">
              Env Name:
              <InfoTip content="Type a new env name." />
            </div>
            <InputText
              {...formik.getFieldProps(`robotLmEnvs.[${envIndex}].name`)}
              disabled={disabled}
              className="!text-sm"
            />
            <InputError
              error={formik?.errors?.robotLmEnvs?.[envIndex]?.name}
              // @ts-ignore
              touched={formik?.touched?.robotLmEnvs?.[envIndex]?.name}
            />
          </div>

          <span className="mt-4">=</span>

          <div>
            <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-light-700">
              Env Value:
              <InfoTip content="Type a new env value." />
            </div>
            <InputText
              {...formik.getFieldProps(`robotLmEnvs.[${envIndex}].value`)}
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
            handleRemoveEnv(formik, envIndex);
          }}
          text="Delete this Env"
          disabled={disabled}
        />
      </div>
    </Accordion>
  );
}
