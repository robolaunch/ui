import React, { Fragment, ReactElement, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import { BiTrash, BiPencil } from "react-icons/bi";
import {
  deleteOrganizationSchema,
  renameOrganizationSchema,
} from "../../validations/OrganizationsValidations";

interface IOrganizationActionCells {
  data: any;
}

export default function OrganizationActionCells({
  data,
}: IOrganizationActionCells): ReactElement {
  const [visibleRename, setVisibleRename] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);

  const renameFormik = useFormik({
    initialValues: {
      newOrganizationName: "",
    },
    validationSchema: renameOrganizationSchema,
    onSubmit: (values) => {
      renameFormik.setSubmitting(true);
      console.log(values, data);
      renameFormik.resetForm();
      setVisibleRename(false);
      renameFormik.setSubmitting(false);
    },
  });

  const deleteFormik = useFormik({
    initialValues: {
      deleteOrganizationName: "",
    },
    validationSchema: deleteOrganizationSchema(data?.organizationName),
    onSubmit: (values) => {
      deleteFormik.setSubmitting(true);
      console.log(values, data);
      deleteFormik.resetForm();
      setVisibleDelete(false);
      deleteFormik.setSubmitting(false);
    },
  });

  return (
    <Fragment>
      <div className="card flex gap-4 float-right">
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-layer-primary-500"
          text={<BiPencil className="text-layer-primary-500" />}
          onClick={() => setVisibleRename(true)}
        />
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-layer-primary-500"
          text={<BiTrash className="text-layer-primary-500" />}
          onClick={() => setVisibleDelete(true)}
        />
      </div>
      <Dialog
        header="Rename Organization"
        visible={visibleRename}
        className="w-[40vw]"
        onHide={() => setVisibleRename(false)}
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
      <Dialog
        header="Delete Organization"
        visible={visibleDelete}
        className="w-[40vw]"
        onHide={() => setVisibleDelete(false)}
      >
        <form
          onSubmit={deleteFormik.handleSubmit}
          className="w-full flex flex-col gap-8"
        >
          <p className="text-sm">
            If you delete this organization, type the name of the organization
            to confirm.
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
    </Fragment>
  );
}
