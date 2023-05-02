import React, { ReactElement, useContext, useEffect } from "react";
import { CreateRobotContext } from "../../../contexts/CreateRobotContext";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import {
  IRobotBuildSteps,
  IRobotData,
} from "../../../interfaces/robotInterfaces";
import Button from "../../Button/Button";
import { SidebarContext } from "../../../contexts/SidebarContext";
import { BsPlusCircle } from "react-icons/bs";
import CreateRobotFormBuildStepItem from "../../CreateRobotFormBuildStepItem/CreateRobotFormBuildStepItem";

export default function CreateRobotFormStep3(): ReactElement {
  const {
    robotData,
    setRobotData,
  }: {
    robotData: IRobotData;
    setRobotData: React.Dispatch<React.SetStateAction<IRobotData>>;
  } = useContext(CreateRobotContext);

  const {
    handleCreateRobotPreviousStep,
    handleCreateRobotNextStep,
  }: {
    handleCreateRobotPreviousStep: () => void;
    handleCreateRobotNextStep: () => void;
  } = useContext(SidebarContext);

  const formik: FormikProps<IRobotBuildSteps> = useFormik<IRobotBuildSteps>({
    validationSchema: Yup.object().shape({
      steps: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .required("Step Name is required")
            .test("unique-name", "This name is already taken", (value) => {
              const temp = formik.values.steps.filter(
                (item: any) => item.name === value && item
              );
              return temp.length > 1 ? false : true;
            }),
          workspace: Yup.string().required("Workspace is required"),
          isScriptCode: Yup.boolean().required("Code Type is required"),
          code: Yup.string().required("Code is required"),
        })
      ),
    }),
    initialValues: robotData?.step3,
    onSubmit: (values: any) => {
      formik.setSubmitting(true);
      //
      formik.setSubmitting(false);
      handleCreateRobotNextStep();
    },
  });

  useEffect(() => {
    setRobotData({
      ...robotData,
      step3: formik.values,
    });
    // eslint-disable-next-line
  }, [formik.values]);

  function handleAddBuildStep() {
    formik.setFieldValue("steps", [
      ...formik.values.steps,
      {
        name: "",
        workspace: "",
        isScriptCode: false,
        code: "",
      },
    ]);
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-8 animate__animated animate__fadeIn"
    >
      <div className="flex flex-col gap-2">
        {robotData?.step3?.steps?.map(
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
      <BsPlusCircle
        onClick={handleAddBuildStep}
        size={22}
        className="mx-auto text-layer-secondary-700 hover:scale-90 transition-all duration-500 cursor-pointer -mt-4"
      />
      <div className="flex gap-6">
        <Button
          onClick={handleCreateRobotPreviousStep}
          type="reset"
          className="!h-11 !bg-layer-light-50 !text-primary border border-primary hover:!bg-layer-primary-100 transition-all duration-500 text-xs"
          text={`Previous Step`}
        />
        <Button
          type="submit"
          disabled={!formik?.isValid || formik.isSubmitting}
          className="!h-11 text-xs"
          text={`Next Step`}
        />
      </div>
    </form>
  );
}
