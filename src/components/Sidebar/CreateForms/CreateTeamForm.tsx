import React, { useContext } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { SidebarContext } from "../../../context/SidebarContext";
import { useFormik } from "formik";
import InputError from "../../InputError/InputError";
import { CreateTeamSchema } from "../../../validations/TeamValidations";
import InputText from "../../InputText/InputText";
import Button from "../../Button/Button";
import { createTeam } from "../../../app/TeamSlice";

export const CreateTeamForm = () => {
  const dispatch = useAppDispatch();
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: CreateTeamSchema,
    onSubmit: (values, { setSubmitting }) => {
      formik.setSubmitting(true);

      dispatch(createTeam({ name: values.name }));

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
          placeholder="Team Name"
          disabled={formik.isSubmitting}
        />
        <InputError error={formik.errors.name} touched={formik.touched.name} />
      </div>
      <Button
        type="submit"
        text="Create a new team"
        disabled={formik.isSubmitting || !formik.isValid}
        loading={formik.isSubmitting}
      />
    </form>
  );
};
