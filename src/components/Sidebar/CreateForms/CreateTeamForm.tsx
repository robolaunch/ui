import React, { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { SidebarContext } from "../../../context/SidebarContext";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import InputError from "../../InputError/InputError";
import { Button } from "primereact/button";
import { CreateTeamSchema } from "../../../validations/TeamValidations";

export const CreateTeamForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);
  const { currentOrganization } = useAppSelector((state) => state.organization);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: CreateTeamSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setSidebarState({ ...sidebarState, isCreateMode: false });
      }, 5000);
    },
  });

  return (
    <div className="flex flex-col gap-8 animate__animated animate__fadeIn">
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
          <label htmlFor="name">Team Name</label>
        </span>
        <InputError error={formik.errors.name} touched={formik.touched.name} />
      </div>
      <Button
        type="submit"
        label="Create a new team"
        onClick={() => formik.handleSubmit()}
        disabled={loading || !formik.isValid}
        loading={loading}
      />
    </div>
  );
};
