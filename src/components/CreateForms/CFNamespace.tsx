import { createFleetSchema } from "../../validations/FleetsValidations";
import FormInputText from "../FormInputText/FormInputText";
import useFunctions from "../../hooks/useFunctions";
import CFSidebar from "../CFSidebar/CFSidebar";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";
import { useFormik } from "formik";

export default function CreateNamespaceForm(): ReactElement {
  const { sidebarState, setSidebarState } = useMain();

  const { createNamespaceFC } = useFunctions();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createFleetSchema,
    onSubmit: (values) => {
      formik.setSubmitting(true);
      createNamespaceFC(values.name).then(() => {
        setSidebarState({ ...sidebarState, isCreateMode: false });
      });
    },
  });

  return (
    <CFSidebar formik={formik} text="Create Namespace">
      <FormInputText
        labelName="Namespace Name:"
        labelInfoTip="Type a new namespace name."
        disabled={formik.isSubmitting}
        inputProps={formik.getFieldProps("name")}
        inputError={formik.errors.name}
        inputTouched={formik.touched.name}
      />
    </CFSidebar>
  );
}
