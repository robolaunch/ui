import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import CFAddButton from "../CFAddButton/CFAddButton";
import { ReactElement } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { FormikProps } from "formik";
import CFContainerMapper from "../CFContainerMapper/CFContainerMapper";

interface ICFContainers {
  formik: FormikProps<IEnvironmentStep1>;
  isImportRobot?: boolean;
}

export default function CFContainers({
  formik,
  isImportRobot,
}: ICFContainers): ReactElement {
  return (
    <CFInfoBar
      label="Containers:"
      tip="Type Containers"
      dataTut="create-robot-step1-containers"
      vertical
      gap={4}
    >
      <CFContainerMapper formik={formik} />
      <CFAddButton
        // @ts-ignore
        onClick={() => {
          formik.setFieldValue("containers", [
            ...formik.values.containers,
            {
              name: "",
              replicaCount: 1,
              image: "",
              command: "",
              privileged: false,
              mountedVolumes: [],
              environmentVariables: [],
            },
          ]);
        }}
        disabled={formik?.isSubmitting}
      />
    </CFInfoBar>
  );
}
