import { createOrganizationSchema } from "../../validations/OrganizationsValidations";
import { createOrganization } from "../../toolkit/OrganizationSlice";
import FormInputText from "../FormInputText/FormInputText";
import { useAppDispatch } from "../../hooks/redux";
import CFSidebar from "../CFSidebar/CFSidebar";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";
import { useFormik } from "formik";

export default function CFOrganization(): ReactElement {
  const { sidebarState, setSidebarState }: any = useMain();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createOrganizationSchema,
    onSubmit: (values) => {
      formik.setSubmitting(true);

      dispatch(
        createOrganization({
          name: values.name,
        }),
      ).then(async () => {
        formik.setSubmitting(false);
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
