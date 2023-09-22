import { useFormik } from "formik";
import { createOrganizationSchema } from "../../validations/OrganizationsValidations";
import CreateFormCancelButton from "../CreateFormCancelButton/CreateFormCancelButton";
import { createOrganization } from "../../toolkit/OrganizationSlice";
import { useAppDispatch } from "../../hooks/redux";
import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import React, { ReactElement } from "react";
import useMain from "../../hooks/useMain";
import InfoTip from "../InfoTip/InfoTip";
import Button from "../Button/Button";

export default function CreateOrganizationForm(): ReactElement {
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
    <form
      onSubmit={formik.handleSubmit}
      className="animate__animated animate__fadeIn flex flex-col gap-8"
    >
      <div>
        <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700">
          Organization Name:
          <InfoTip content="Type a new organization name." />
        </div>
        <InputText
          {...formik.getFieldProps("name")}
          className="!text-sm"
          disabled={formik.isSubmitting}
        />
        <InputError error={formik.errors.name} touched={formik.errors.name} />
      </div>

      <div className="flex gap-2">
        <CreateFormCancelButton disabled={formik.isSubmitting} />
        <Button
          type="submit"
          text="Create a new organization"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
          className="!h-11"
        />
      </div>
    </form>
  );
}
