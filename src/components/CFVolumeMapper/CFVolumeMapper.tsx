import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import { Fragment, ReactElement } from "react";
import CFVolume from "../CFVolume/CFVolume";
import { FormikProps } from "formik";

interface ICFVolumeMapper {
  formik: FormikProps<IEnvironmentStep1>;
}

export default function CFVolumeMapper({
  formik,
}: ICFVolumeMapper): ReactElement {
  return (
    <Fragment>
      {formik.values.volumes.map((_, index) => {
        return <CFVolume formik={formik} index={index} key={index} />;
      })}
    </Fragment>
  );
}
