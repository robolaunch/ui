import { FormikProps } from "formik";
import { Fragment, ReactElement } from "react";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import CFAddButton from "../CFAddButton/CFAddButton";
import CFContainerEnv from "../CFContainerEnv/CFContainerEnv";

interface ICFContainerEnvMapper {
  formik: FormikProps<IEnvironmentStep1>;
  containerIndex: number;
}

export default function CFContainerEnvMapper({
  formik,
  containerIndex,
}: ICFContainerEnvMapper): ReactElement {
  return (
    <Fragment>
      {formik?.values?.launchContainers?.[
        containerIndex
      ]?.container?.environmentVariables?.map((_, envIndex: number) => {
        return (
          <CFContainerEnv
            formik={formik}
            containerIndex={containerIndex}
            envIndex={envIndex}
            key={envIndex}
          />
        );
      })}
      <div data-tut="create-robot-step4-environments-add-button">
        <CFAddButton
          onClick={() => {
            formik.setFieldValue(
              `launchContainers[${containerIndex}].container.environmentVariables`,
              [
                ...formik.values?.launchContainers[containerIndex]?.container
                  ?.environmentVariables,
                {
                  name: "",
                  value: "",
                },
              ],
            );
          }}
          disabled={formik?.isSubmitting}
        />
      </div>
    </Fragment>
  );
}
