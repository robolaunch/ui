import { renameOrganizationSchema } from "../validations/OrganizationsValidations";
import InputError from "../components/InputError/InputError";
import InputText from "../components/InputText/InputText";
import Button from "../components/Button/Button";
import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";
import { useFormik } from "formik";

interface IRenameOrganizationModal {
  data: any;
  reload: () => void;
  handleCloseModal: () => void;
}

export default function RenameOrganizationModal({
  data,
  handleCloseModal,
}: IRenameOrganizationModal): ReactElement {
  const renameFormik = useFormik({
    initialValues: {
      newOrganizationName: "",
    },
    validationSchema: renameOrganizationSchema,
    onSubmit: () => {
      renameFormik.setSubmitting(true);
      renameFormik.resetForm();
      handleCloseModal();
      renameFormik.setSubmitting(false);
    },
  });

  return (
    <Dialog
      header="Rename Organization"
      visible={true}
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
