import { FormikProps } from "formik";
import { Fragment, ReactElement } from "react";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import CFContainer from "../CFContainer/CFContainer";

interface ICFContainerMapper {
  formik: FormikProps<IEnvironmentStep1>;
}

export default function CFContainerMapper({
  formik,
}: ICFContainerMapper): ReactElement {
  return (
    <Fragment>
      {formik.values.launchContainers?.map((_, index) => (
        <CFContainer formik={formik} index={index} key={index} />
      ))}
    </Fragment>
  );
}
