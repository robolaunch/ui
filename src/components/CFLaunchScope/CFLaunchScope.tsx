import React, { ReactElement } from "react";
import { IRobotLaunchStep } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import CreateRobotFormCodeScope from "../CreateRobotFormCodeScope/CreateRobotFormCodeScope";
import useMain from "../../hooks/useMain";
import useCreateRobot from "../../hooks/useCreateRobot";

interface ICFLaunchScope {
  formik: FormikProps<IRobotLaunchStep>;
  disabled?: boolean;
}

export default function CFLaunchScope({
  formik,
  disabled,
}: ICFLaunchScope): ReactElement {
  const { robotData } = useCreateRobot();
  const { selectedState } = useMain();

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
            robotData?.step1?.physicalInstanceName,
          )
            ? formik.values.instancesName.filter(
                (item) => item !== robotData?.step1?.physicalInstanceName,
              )
            : [
                ...formik.values.instancesName,
                robotData?.step1?.physicalInstanceName,
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
