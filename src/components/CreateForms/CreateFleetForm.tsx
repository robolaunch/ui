import { useFormik } from "formik";
import React, { ReactElement } from "react";
import InputError from "../InputError/InputError";
import { createFleetSchema } from "../../validations/FleetsValidations";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import useSidebar from "../../hooks/useSidebar";
import { useAppDispatch } from "../../hooks/redux";
import { createFederatedFleet } from "../../resources/FleetSlice";

export default function CreateFleetForm(): ReactElement {
  const { sidebarState, setSidebarState, selectedState } = useSidebar();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createFleetSchema,
    onSubmit: (values) => {
      formik.setSubmitting(true);
      dispatch(
        createFederatedFleet({
          robolaunchFederatedFleetsName: values.name,
          organizationId: selectedState?.organization?.organizationId,
          roboticsCloudName: selectedState?.roboticsCloud?.name,
          instanceId: selectedState?.instance?.instanceId,
          region: selectedState?.instance?.region,
        })
      ).then((response) => {
        formik.setSubmitting(false);
        setSidebarState({ ...sidebarState, isCreateMode: false });
      });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-8 animate__animated animate__fadeIn"
    >
      <div>
        <InputText
          {...formik.getFieldProps("name")}
          placeholder="Fleet Name"
          disabled={formik.isSubmitting}
        />
        <InputError error={formik.errors.name} touched={formik.touched.name} />
      </div>
      <div>
        <Button
          type="submit"
          text="Create a new fleet"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
          className="!h-11"
        />
      </div>
    </form>
  );
}
