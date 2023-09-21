import { useFormik } from "formik";
import React, { ReactElement } from "react";
import { renameOrganizationSchema } from "../validations/OrganizationsValidations";
import { Dialog } from "primereact/dialog";
import InputText from "../components/InputText/InputText";
import InputError from "../components/InputError/InputError";
import Button from "../components/Button/Button";

interface IRenameOrganizationModal {
  data: any;
  reload: () => void;
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
        className="flex w-full flex-col gap-8"
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
        <div className="flex items-center justify-end gap-4">
          <Button
            className="!h-11 !w-44"
            type="submit"
            text="Rename Organization"
            disabled={
              renameFormik.isSubmitting || !renameFormik.isValid || true
            }
          />
        </div>
      </form>
    </Dialog>
  );
}
