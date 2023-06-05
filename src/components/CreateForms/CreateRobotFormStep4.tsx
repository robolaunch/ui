import React, { Fragment, ReactElement, useEffect } from "react";
import { IRobotLaunchSteps } from "../../interfaces/robotInterfaces";
import useCreateRobot from "../../hooks/useCreateRobot";
import { FormikProps, useFormik } from "formik";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import CreateRobotFormLaunchStepItem from "../CreateRobotFormLaunchStepItem/CreateRobotFormLaunchStepItem";

export default function CreateRobotFormStep4(): ReactElement {
  const { robotData, setRobotData } = useCreateRobot();

  const formik: FormikProps<IRobotLaunchSteps> = useFormik<IRobotLaunchSteps>({
    initialValues: robotData?.step4,
    onSubmit: async (values: any) => {
      formik.setSubmitting(true);
    },
  });

  useEffect(() => {
    setRobotData({
      ...robotData,
      step4: formik.values,
    });
    // eslint-disable-next-line
  }, [formik.values]);

  return (
    <Fragment>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 animate__animated animate__fadeIn pt-6"
      >
        <div>
          <InputText
            {...formik.getFieldProps(`launchManagerName`)}
            placeholder="Launch Manager Name"
            disabled={formik?.isSubmitting}
          />
          <InputError
            // @ts-ignore
            error={formik?.errors?.launchManagerName}
            touched={formik?.touched?.launchManagerName}
          />
        </div>

        <div className="flex flex-col gap-2">
          {robotData?.step4?.robotLaunchSteps?.map(
            (launchStep: any, launchStepIndex: number) => {
              return (
                <CreateRobotFormLaunchStepItem
                  key={launchStepIndex}
                  formik={formik}
                  launchStep={launchStep}
                  launchStepIndex={launchStepIndex}
                />
              );
            }
          )}
        </div>
      </form>
    </Fragment>
  );
}
