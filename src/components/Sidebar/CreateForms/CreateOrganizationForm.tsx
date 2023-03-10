import { useFormik } from "formik";
import React, { useContext } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { CreateOrganizationSchema } from "../../../validations/OrganizationsValidations";
import InputError from "../../InputError/InputError";
import { SidebarContext } from "../../../contexts/SidebarContext";
import InputText from "../../InputText/InputText";
import Button from "../../Button/Button";
import { createOrganization } from "../../../app/OrganizationSlice";

export const CreateOrganizationForm = () => {
  const dispatch = useAppDispatch();
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: CreateOrganizationSchema,
    onSubmit: (values) => {
      formik.setSubmitting(true);
      dispatch(
        createOrganization({
          name: values.name,
        })
      );

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
      />
    </form>
  );
};
