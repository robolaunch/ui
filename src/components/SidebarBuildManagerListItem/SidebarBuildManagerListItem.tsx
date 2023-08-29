import React, { ReactElement, useState } from "react";
import CreateRobotFormBuildStepItem from "../CreateRobotFormBuildStepItem/CreateRobotFormBuildStepItem";
import { IRobotBuildSteps } from "../../interfaces/robotInterfaces";
import InputError from "../InputError/InputError";
import Accordion from "../Accordion/AccordionV2";
import { FormikProps, useFormik } from "formik";
import InputText from "../InputText/InputText";
import { BsPlusCircle } from "react-icons/bs";
import InfoTip from "../InfoTip/InfoTip";
import Button from "../Button/Button";

interface ISidebarBuildManagerListItem {
  buildManagerIndex: number;
  buildManagerItem: any;
}

export default function SidebarBuildManagerListItem({
  buildManagerIndex,
  buildManagerItem,
}: ISidebarBuildManagerListItem): ReactElement {
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(false);

  const formik: FormikProps<IRobotBuildSteps> = useFormik<IRobotBuildSteps>({
    initialValues: {
      buildManagerName: buildManagerItem?.buildManagerName,
      robotBuildSteps: buildManagerItem?.robotBuildSteps,
    },
    onSubmit: async (values: any) => {
      formik.setSubmitting(true);
    },
  });

  return (
    <Accordion
      key={buildManagerIndex}
      id={buildManagerIndex}
      isOpen={isShowAccordion}
      handleOpen={() => setIsShowAccordion(!isShowAccordion)}
      header={
        <span className="font-medium">
          {buildManagerItem?.buildManagerName}
        </span>
      }
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 animate__animated animate__fadeIn pt-6"
      >
        <div>
          <InputText
            {...formik.getFieldProps(`buildManagerName`)}
            placeholder="Build Manager Name"
            disabled={formik?.isSubmitting}
          />
          <InputError
            // @ts-ignore
            error={formik?.errors?.buildManagerName}
            touched={formik?.touched?.buildManagerName}
          />
        </div>
        <div>
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
            Build Steps:
            <InfoTip content="Build Steps" />
          </div>
          <div className="flex flex-col gap-2">
            {formik?.values?.robotBuildSteps?.map(
              (buildStep: any, buildStepIndex: number) => {
                return (
                  <CreateRobotFormBuildStepItem
                    key={buildStepIndex}
                    formik={formik}
                    buildStep={buildStep}
                    buildStepIndex={buildStepIndex}
                  />
                );
              }
            )}
          </div>
        </div>
        <BsPlusCircle
          //   onClick={() => handleAddStepToBuildStep(formik)}
          size={22}
          className="h-14 mx-auto text-layer-secondary-700 hover:scale-90 transition-all duration-500 cursor-pointer -mt-4"
        />
        <div className="flex gap-6">
          <Button
            // onClick={handleCreateRobotPreviousStep}
            type="reset"
            className="!h-11 !bg-layer-light-50 !text-primary border border-primary hover:!bg-layer-primary-100 transition-all duration-500 text-xs"
            text={`Previous Step`}
          />
          <Button
            type="submit"
            disabled={!formik?.isValid || formik.isSubmitting}
            className="!h-11 text-xs"
            text={
              formik.isSubmitting ? (
                <img
                  className="w-10 h-10"
                  src="/svg/general/loading.svg"
                  alt="loading"
                />
              ) : (
                `Next Step`
              )
            }
          />
        </div>
      </form>
    </Accordion>
  );
}
