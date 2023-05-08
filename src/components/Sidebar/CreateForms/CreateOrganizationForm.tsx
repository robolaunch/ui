import { useFormik } from "formik";
import React, { ReactElement, useContext } from "react";
import { createOrganizationSchema } from "../../../validations/OrganizationsValidations";
import InputError from "../../InputError/InputError";
import { SidebarContext } from "../../../contexts/SidebarContext";
import InputText from "../../InputText/InputText";
import Button from "../../Button/Button";
import { Api } from "../../../types/types";
import { ApiContext } from "../../../contexts/ApiContext";

export default function CreateOrganizationForm(): ReactElement {
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);

  const { api }: Api = useContext(ApiContext);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createOrganizationSchema,
    onSubmit: (values) => {
      formik.setSubmitting(true);

      api.createOrganization({
        name: values.name,
      });

      setTimeout(() => {
        formik.setSubmitting(false);
        setSidebarState({ ...sidebarState, isCreateMode: false });
      }, 5000);
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
          placeholder="Organization Name"
          disabled={formik.isSubmitting}
        />
        <InputError error={formik.errors.name} touched={formik.errors.name} />
      </div>
      <Button
        type="submit"
        text="Create a new organization"
        disabled={formik.isSubmitting || !formik.isValid}
        loading={formik.isSubmitting}
        className="!h-11"
      />
    </form>
  );
}
