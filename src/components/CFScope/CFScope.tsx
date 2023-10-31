import React, { ReactElement } from "react";
import CreateRobotFormCodeScope from "../CreateRobotFormCodeScope/CreateRobotFormCodeScope";
import { FormikProps } from "formik/dist/types";
import { IRobotBuildSteps } from "../../interfaces/robotInterfaces";
import useMain from "../../hooks/useMain";
import useCreateRobot from "../../hooks/useCreateRobot";

interface ICFBuildName {
  formik: FormikProps<IRobotBuildSteps>;
  buildStepIndex: number;
}

export default function CFScope({
  formik,
  buildStepIndex,
}: ICFBuildName): ReactElement {
  const { selectedState } = useMain();
  const { robotData } = useCreateRobot();

  return (
    <CreateRobotFormCodeScope
      virtualInstanceDisabled={formik?.isSubmitting}
      physicalInstanceDisabled={formik?.isSubmitting}
      virtualInstanceChecked={formik.values.robotBuildSteps[
        buildStepIndex
      ]?.instancesName?.includes(selectedState?.instance?.name)}
      physicalInstanceChecked={formik.values.robotBuildSteps[
        buildStepIndex
      ]?.instancesName?.includes(robotData?.step1?.physicalInstanceName)}
      virtualInstanceOnChange={(e) => {
        formik.setValues((prevValues) => ({
          ...prevValues,
          robotBuildSteps: prevValues.robotBuildSteps.map((item, index) => {
            if (index === buildStepIndex) {
              return {
                ...item,
                instancesName: e.target.checked
                  ? [...item.instancesName, selectedState?.instance?.name]
                  : item.instancesName.filter(
                      (name) => name !== selectedState?.instance?.name,
                    ),
              };
            }
            return item;
          }),
        }));
      }}
      physicalInstanceOnChange={(e) => {
        formik.setValues((prevValues) => ({
          ...prevValues,
          robotBuildSteps: prevValues.robotBuildSteps.map((item, index) => {
            if (index === buildStepIndex) {
              return {
                ...item,
                instancesName: e.target.checked
                  ? [
                      ...item.instancesName,
                      robotData?.step1?.physicalInstanceName,
                    ]
                  : item.instancesName.filter(
                      (name) => name !== robotData?.step1?.physicalInstanceName,
                    ),
              };
            }
            return item;
          }),
        }));
      }}
      error={
        // @ts-ignore
        formik?.errors?.robotBuildSteps?.[buildStepIndex]?.instancesName
      }
    />
  );
}
