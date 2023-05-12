import { useFormik } from "formik";
import { Dialog } from "primereact/dialog";
import React, { ReactElement } from "react";
import { deleteOrganizationSchema } from "../validations/OrganizationsValidations";
import InputError from "../components/InputError/InputError";
import InputText from "../components/InputText/InputText";
import Button from "../components/Button/Button";

interface IDeleteOrganizationModal {
  data: any;
  visibleModal: boolean;
  handleCloseModal: () => void;
}

export default function DeleteOrganizationModal({
  data,
  visibleModal,
  handleCloseModal,
}: IDeleteOrganizationModal): ReactElement {
  const deleteFormik = useFormik({
    initialValues: {
      deleteOrganizationName: "",
    },
    validationSchema: deleteOrganizationSchema(data?.organizationName),
    onSubmit: (values) => {
      deleteFormik.setSubmitting(true);
      console.log(values, data);
      deleteFormik.resetForm();
      handleCloseModal();
      deleteFormik.setSubmitting(false);
    },
  });

  return (
    <Dialog
      header="Delete Organization"
      visible={visibleModal}
      className="w-[40vw]"
      onHide={() => handleCloseModal()}
    >
      <form
        onSubmit={deleteFormik.handleSubmit}
        className="w-full flex flex-col gap-8"
      >
        <p className="text-sm">
          If you delete this organization, type the name of the organization to
          confirm.
        </p>
        <div className="w-full">
          <InputText
            {...deleteFormik.getFieldProps("deleteOrganizationName")}
            placeholder="Organization Name"
            disabled={deleteFormik.isSubmitting}
          />
          <InputError
            touched={deleteFormik.touched.deleteOrganizationName}
            error={deleteFormik.errors.deleteOrganizationName}
          />
        </div>
        <div className="flex justify-end items-center gap-4">
          <Button
            className="!w-44 !h-11"
            type="submit"
            text="Delete Organization"
            disabled={deleteFormik.isSubmitting || !deleteFormik.isValid}
          />
        </div>
      </form>
    </Dialog>
  );
}
