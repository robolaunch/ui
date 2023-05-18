import { useFormik } from "formik";
import React, { ReactElement } from "react";
import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import useSidebar from "../../hooks/useSidebar";
import { useAppDispatch } from "../../hooks/redux";
import { createCloudInstance } from "../../resources/InstanceSlice";

export default function CreateInstancesForm(): ReactElement {
  const { sidebarState, setSidebarState, selectedState } = useSidebar();
  const dispatch = useAppDispatch();

  const formik: any = useFormik({
    initialValues: {
      cloudInstanceName: "",
    },
    onSubmit: (values) => {
      formik.setSubmitting(true);

      dispatch(
        createCloudInstance({
          organizationId: selectedState.organization.organizationId,
          roboticsCloudName: selectedState.roboticsCloud.name,
          cloudInstanceName: values.cloudInstanceName,
        })
      ).then((response: any) => {
        if (response) {
          formik.setSubmitting(false);
          setSidebarState({ ...sidebarState, isCreateMode: false });
        }
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
          {...formik.getFieldProps("cloudInstanceName")}
          placeholder="Cloud Instance Name"
          type="text"
          disabled={formik.isSubmitting}
        />
        <InputError
          error={formik.errors.cloudInstanceName}
          touched={formik.touched.cloudInstanceName}
        />
      </div>

      <div>
        <Button
          type="submit"
          text="Create a new Cloud Instance"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
          className="!h-11"
        />
      </div>
    </form>
  );
}
