import { FormikProps } from "formik";
import { Fragment, ReactElement } from "react";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import CFAddButton from "../CFAddButton/CFAddButton";
import CFContainerVolume from "../CFContainerVolume/CFContainerVolume";

interface ICFContainerVolumeMapper {
  formik: FormikProps<IEnvironmentStep1>;
  containerIndex: number;
}

export default function CFContainerVolumeMapper({
  formik,
  containerIndex,
}: ICFContainerVolumeMapper): ReactElement {
  return (
    <Fragment>
      {formik?.values?.containers[containerIndex]?.mountedVolumes?.map(
        (_, volumeIndex: number) => {
          return (
            <CFContainerVolume
              containerIndex={containerIndex}
              volumeIndex={volumeIndex}
              formik={formik}
              key={volumeIndex}
            />
          );
        },
      )}
      <div data-tut="create-robot-step4-environments-add-button">
        <CFAddButton
          onClick={() => {
            formik.setFieldValue(
              `containers[${containerIndex}].mountedVolumes`,
              [
                ...formik?.values?.containers[containerIndex]?.mountedVolumes,
                {
                  name: "",
                  path: "",
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
