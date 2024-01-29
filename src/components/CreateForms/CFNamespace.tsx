import { createFleetSchema } from "../../validations/FleetsValidations";
import { createNamespace } from "../../toolkit/FleetSlice";
import FormInputText from "../FormInputText/FormInputText";
import { useAppDispatch } from "../../hooks/redux";
import CFSidebar from "../CFSidebar/CFSidebar";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";
import { useFormik } from "formik";

export default function CreateNamespaceForm(): ReactElement {
  const { sidebarState, setSidebarState, selectedState } = useMain();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createFleetSchema,
    onSubmit: (values) => {
      formik.setSubmitting(true);
      dispatch(
        createNamespace({
          namespaceName: values.name,
          organizationId: selectedState?.organization?.id!,
          roboticsCloudName: selectedState?.roboticsCloud?.name!,
          instanceId: selectedState?.instance?.id!,
          region: selectedState?.roboticsCloud?.region!,
        }),
      ).then(() => {
        formik.setSubmitting(false);
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
