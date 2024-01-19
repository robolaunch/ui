import CreateRobotFormCodeScope from "../CreateRobotFormCodeScope/CreateRobotFormCodeScope";
import { IBuildSteps } from "../../interfaces/robotInterfaces";
import useCreateRobot from "../../hooks/useCreateRobot";
import { FormikProps } from "formik/dist/types";
import React, { ReactElement } from "react";
import useMain from "../../hooks/useMain";

interface ICFBuildScope {
  formik: FormikProps<IBuildSteps>;
  buildStepIndex: number;
}

export default function CFBuildScope({
  formik,
  buildStepIndex,
}: ICFBuildScope): ReactElement {
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
      ]?.instancesName?.includes(robotData?.step1?.tree.physicalInstance.name)}
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
                      robotData?.step1?.tree.physicalInstance.name,
                    ]
                  : item.instancesName.filter(
                      (name) =>
                        name !== robotData?.step1?.tree.physicalInstance.name,
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
