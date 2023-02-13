import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { CreateOrganizationSchema } from "../../../validations/OrganizationsValidations";
import { InputText } from "primereact/inputtext";
import InputError from "../../InputError/InputError";
import { Button } from "primereact/button";
import { createOrganization } from "../../../app/OrganizationSlice";
import { SidebarContext } from "../../../context/SidebarContext";

export const CreateOrganizationForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      enterprise: false,
    },
    validationSchema: CreateOrganizationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      dispatch(
        createOrganization({
          organization: {
            name: values.name,
            enterprise: values.enterprise,
          },
        })
      );
      setTimeout(() => {
        setLoading(false);
        setSidebarState({ ...sidebarState, isCreateMode: false });
      }, 5000);
    },
  });

  return (
    <form className="flex flex-col gap-8 animate__animated animate__fadeIn">
      <div>
        <span className="p-float-label">
          <InputText
            {...formik.getFieldProps("name")}
            id="name"
            name="name"
            type="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <label htmlFor="name">Organization Name</label>
        </span>
        <InputError error={formik.errors.name} touched={formik.errors.name} />
      </div>
      <Button
        type="submit"
        label="Create a new organization"
        onClick={() => formik.handleSubmit()}
        disabled={loading || !formik.isValid}
        loading={loading}
      />
    </form>
  );
};
