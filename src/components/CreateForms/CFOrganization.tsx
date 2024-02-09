import { createOrganizationSchema } from "../../validations/OrganizationsValidations";
import FormInputText from "../FormInputText/FormInputText";
import CFSidebar from "../CFSidebar/CFSidebar";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";
import { useFormik } from "formik";
import useFunctions from "../../hooks/useFunctions";

export default function CFOrganization(): ReactElement {
  const { sidebarState, setSidebarState } = useMain();
  const { createOrganizationFC } = useFunctions();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createOrganizationSchema,
    onSubmit: (values) => {
      formik.setSubmitting(true);
      createOrganizationFC(values.name).then(() => {
        setSidebarState({ ...sidebarState, isCreateMode: false });
      });
    },
  });

  return (
    <CFSidebar formik={formik} text="Create Organization">
      <FormInputText
        labelName="Organization Name:"
        labelInfoTip="Type a new organization name."
        dataTut="create-application-step1-name"
        disabled={formik.isSubmitting}
        inputProps={formik.getFieldProps("name")}
        inputError={formik.errors.name}
        inputTouched={!!formik.errors.name}
      />
    </CFSidebar>
  );
}
