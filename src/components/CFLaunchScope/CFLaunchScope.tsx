import CreateRobotFormCodeScope from "../CreateRobotFormCodeScope/CreateRobotFormCodeScope";
import { FormikProps } from "formik/dist/types";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";
import { IEnvironmentStep4LaunchStep } from "../../interfaces/environment/environment.step4.interface";

interface ICFLaunchScope {
  formik: FormikProps<IEnvironmentStep4LaunchStep>;
  disabled?: boolean;
}

export default function CFLaunchScope({
  formik,
  disabled,
}: ICFLaunchScope): ReactElement {
  const { robotData, selectedState } = useMain();

  return (
    <CreateRobotFormCodeScope
      virtualInstanceDisabled={disabled || formik?.isSubmitting}
      physicalInstanceDisabled={disabled || formik?.isSubmitting}
      virtualInstanceChecked={formik.values?.instancesName?.includes(
        selectedState?.instance?.name,
      )}
      virtualInstanceOnChange={() => {
        formik.setValues({
          ...formik.values,
          instancesName: formik.values.instancesName.includes(
            selectedState?.instance?.name,
          )
            ? formik.values.instancesName.filter(
                (item) => item !== selectedState?.instance?.name,
              )
            : [...formik.values.instancesName, selectedState?.instance?.name],
        });
      }}
      physicalInstanceOnChange={(e) => {
        formik.setValues({
          ...formik.values,
          instancesName: formik.values.instancesName.includes(
            robotData?.step1?.details?.physicalInstanceName,
          )
            ? formik.values.instancesName.filter(
                (item) =>
                  item !== robotData?.step1?.details?.physicalInstanceName,
              )
            : [
                ...formik.values.instancesName,
                robotData?.step1?.details?.physicalInstanceName,
              ],
        });
      }}
      error={
        // @ts-ignore
        formik?.errors?.instancesName
      }
    />
  );
}
