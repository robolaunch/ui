import { useFormik } from "formik";
import React, { ReactElement } from "react";
import { renameOrganizationSchema } from "../validations/OrganizationsValidations";
import { Dialog } from "primereact/dialog";
import InputText from "../components/InputText/InputText";
import InputError from "../components/InputError/InputError";
import Button from "../components/Button/Button";

interface IRenameOrganizationModal {
  data: any;
  visibleModal: boolean;
  handleCloseModal: () => void;
}

export default function RenameOrganizationModal({
  data,
  visibleModal,
  handleCloseModal,
}: IRenameOrganizationModal): ReactElement {
  const renameFormik = useFormik({
    initialValues: {
      newOrganizationName: "",
    },
    validationSchema: renameOrganizationSchema,
    onSubmit: (values) => {
      renameFormik.setSubmitting(true);
      renameFormik.resetForm();
      handleCloseModal();
      renameFormik.setSubmitting(false);
    },
  });

  return (
    <Dialog
      header="Rename Organization"
      visible={visibleModal}
      className="w-[40vw]"
      onHide={() => handleCloseModal()}
    >
      <form
        onSubmit={renameFormik.handleSubmit}
        className="w-full flex flex-col gap-8"
      >
        <p className="text-sm">
          Are you sure you want to rename the organization?
        </p>
        <div className="w-full">
          <InputText
            {...renameFormik.getFieldProps("newOrganizationName")}
            placeholder="New Organization Name"
            disabled={renameFormik.isSubmitting}
          />
          <InputError
            touched={renameFormik.touched.newOrganizationName}
            error={renameFormik.errors.newOrganizationName}
          />
        </div>
        <div className="flex justify-end items-center gap-4">
          <Button
            className="!w-44 !h-11"
            type="submit"
            text="Rename Organization"
            disabled={renameFormik.isSubmitting || !renameFormik.isValid}
          />
        </div>
      </form>
    </Dialog>
  );
}
