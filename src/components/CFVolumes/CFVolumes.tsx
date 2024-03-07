import { FormikProps } from "formik";
import { ReactElement, useEffect } from "react";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import CFAddButton from "../CFAddButton/CFAddButton";
import CFVolumeMapper from "../CFVolumeMapper/CFVolumeMapper";

interface ICFVolumes {
  formik: FormikProps<IEnvironmentStep1>;
  isImportRobot?: boolean;
}

export default function CFVolumes({
  formik,
  isImportRobot,
}: ICFVolumes): ReactElement {
  useEffect(() => {
    console.log(formik.values.volumes);
  }, [formik]);

  return (
    <CFInfoBar
      label="Volumes:"
      tip="Type Volumes"
      dataTut="create-robot-step1-volumes"
      vertical
      gap={4}
    >
      <CFVolumeMapper formik={formik} />
      <CFAddButton
        // @ts-ignore
        onClick={() => {
          formik.setFieldValue("volumes", [
            ...formik.values.volumes,
            {
              name: `${formik.values.details.name}-pvc-${formik.values.volumes.length}`,
              capacity: 2,
            },
          ]);
        }}
        disabled={formik?.isSubmitting}
      />
    </CFInfoBar>
  );
}
