import { useFormik } from "formik";
import React, { ReactElement } from "react";
import { createOrganizationSchema } from "../../validations/OrganizationsValidations";
import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import { useAppDispatch } from "../../hooks/redux";
import { createOrganization } from "../../toolkit/OrganizationSlice";
import useSidebar from "../../hooks/useSidebar";
import InfoTip from "../InfoTip/InfoTip";

export default function CreateOrganizationForm(): ReactElement {
  const { sidebarState, setSidebarState }: any = useSidebar();

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
        })
      ).then(async () => {
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
        <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
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
