import CreateRobotFormCodeScope from "../CreateRobotFormCodeScope/CreateRobotFormCodeScope";
import { IBuildSteps } from "../../interfaces/robotInterfaces";
import useCreateRobot from "../../hooks/useCreateRobot";
import { FormikProps } from "formik/dist/types";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";

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
      virtualInstanceChecked={formik.values.steps[
        buildStepIndex
      ]?.instanceScope?.includes(selectedState?.instance?.name!)}
      physicalInstanceChecked={formik.values.steps[
        buildStepIndex
      ]?.instanceScope?.includes(
        robotData?.step1?.details?.physicalInstanceName,
      )}
      virtualInstanceOnChange={(e) => {
        formik.setValues((prevValues) => ({
          ...prevValues,
          steps: prevValues.steps.map((item, index) => {
            if (index === buildStepIndex) {
              return {
                ...item,
                instanceScope: e.target.checked
                  ? [...item.instanceScope, selectedState?.instance?.name!]
                  : item.instanceScope.filter(
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
          steps: prevValues.steps.map((item, index) => {
            if (index === buildStepIndex) {
              return {
                ...item,
                instanceScope: e.target.checked
                  ? [
                      ...item.instanceScope,
                      robotData?.step1?.details?.physicalInstanceName,
                    ]
                  : item.instanceScope.filter(
                      (name) =>
                        name !==
                        robotData?.step1?.details?.physicalInstanceName,
                    ),
              };
            }
            return item;
          }),
        }));
      }}
      error={
        // @ts-ignore
        formik?.errors?.steps?.[buildStepIndex]?.instanceScope
      }
    />
  );
}
