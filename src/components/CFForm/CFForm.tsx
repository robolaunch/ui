import { FormikProps } from "formik";
import { ReactElement } from "react";
import CFButtons from "../CFButtons/CFButtons";

interface ICFForm {
  formik: FormikProps<any>;
  children: ReactElement | ReactElement[];
}

export default function CFForm({ formik, children }: ICFForm): ReactElement {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="animate__animated animate__fadeIn flex flex-col gap-4"
    >
      {children}
      <CFButtons formik={formik} text="Connect Physical Instance" />
    </form>
  );
}
