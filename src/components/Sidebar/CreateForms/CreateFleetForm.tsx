import { useFormik } from "formik";
import React, { Fragment, useContext } from "react";
import InputError from "../../InputError/InputError";
import { createFleetSchema } from "../../../validations/FleetsValidations";
import InputText from "../../InputText/InputText";
import Button from "../../Button/Button";
import InputSelect from "../../InputSelect/InputSelect";
import { SidebarContext } from "../../../contexts/SidebarContext";

export const CreateFleetForm = () => {
  const { selectedState, sidebarState, setSidebarState }: any =
    useContext(SidebarContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      isFederated: "",
    },
    validationSchema: createFleetSchema,
    onSubmit: (values, { setSubmitting }) => {
      formik.setSubmitting(true);

      // api handler

      setTimeout(() => {
        formik.setSubmitting(false);
        setSidebarState({ ...sidebarState, isCreateMode: false });
      }, 1000);
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
        <InputSelect
          {...formik.getFieldProps("isFederated")}
          placeholder="Fleet Type"
          disabled={formik.isSubmitting}
        >
          <Fragment>
            {!formik.values.isFederated && <option value=""></option>}
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Fragment>
        </InputSelect>
        <InputError
          error={formik.errors.isFederated}
          touched={formik.touched.isFederated}
        />
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
};
