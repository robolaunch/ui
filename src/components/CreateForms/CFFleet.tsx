import { createFleetSchema } from "../../validations/FleetsValidations";
import FormInputText from "../FormInputText/FormInputText";
import CFSidebar from "../CFSidebar/CFSidebar";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";
import { useFormik } from "formik";
import useFunctions from "../../hooks/useFunctions";

export default function CreateFleetForm(): ReactElement {
  const { sidebarState, setSidebarState } = useMain();
  const { createFleetFC } = useFunctions();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createFleetSchema,
    onSubmit: (values) => {
      formik.setSubmitting(true);
      createFleetFC(values.name).then(() => {
        setSidebarState({ ...sidebarState, isCreateMode: false });
      });
    },
  });

  return (
    <CFSidebar formik={formik} text="Create Fleet">
      <FormInputText
        labelName="Fleet Name:"
        labelInfoTip="Type a new fleet name."
        disabled={formik.isSubmitting}
        inputProps={formik.getFieldProps("name")}
        inputError={formik.errors.name}
        inputTouched={formik.touched.name}
      />
    </CFSidebar>
  );
}
