import { deleteOrganizationSchema } from "../validations/OrganizationsValidations";
import { deleteOrganization } from "../toolkit/OrganizationSlice";
import InputError from "../components/InputError/InputError";
import InputText from "../components/InputText/InputText";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import React, { ReactElement } from "react";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";

interface IDeleteOrganizationModal {
  data: any;
  reload: () => void;
  handleCloseModal: () => void;
}

export default function DeleteOrganizationModal({
  data,
  reload,
  handleCloseModal,
}: IDeleteOrganizationModal): ReactElement {
  const dispatch = useAppDispatch();
  const deleteFormik = useFormik({
    initialValues: {
      deleteOrganizationName: "",
    },
    validationSchema: deleteOrganizationSchema(
      data?.organizationName?.split("_")[1],
    ),
    onSubmit: (values) => {
      deleteFormik.setSubmitting(true);

      dispatch(
        deleteOrganization({
          organizationId: data?.organizationId,
        }),
      ).then(async () => {
        deleteFormik.resetForm();
        handleCloseModal();
      });
    },
  });

  return (
    <Dialog
      header="Delete Organization"
      visible={true}
      className="w-[40vw]"
      onHide={() => handleCloseModal()}
    >
      <form
        onSubmit={deleteFormik.handleSubmit}
        className="flex w-full flex-col gap-8"
      >
        <p className="text-sm">
          If you delete this organization, type the name (
          {data?.organizationName?.split("_")[1]}) of the organization to
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
        <div className="flex items-center justify-end gap-4">
          <Button
            className="!h-11 !w-44"
            type="submit"
            text="Delete Organization"
            disabled={
              deleteFormik.isSubmitting || !deleteFormik.isValid || true
            }
          />
        </div>
      </form>
    </Dialog>
  );
}
