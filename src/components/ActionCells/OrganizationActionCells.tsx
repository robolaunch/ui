import React, { ReactElement, useRef, useState } from "react";
import { Button } from "primereact/button";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import InputError from "../InputError/InputError";
import { RenameTeamSchema } from "../../validations/TeamValidations";

interface IOrganizationActionCells {
  data: any;
}

export default function OrganizationActionCells({
  data,
}: IOrganizationActionCells): ReactElement {
  const [visibleRename, setVisibleRename] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const buttonElRename: any = useRef(null);
  const buttonElDelete: any = useRef(null);

  const acceptDelete = () => {
    console.log("accept");
  };

  const formik = useFormik({
    initialValues: {
      newTeamName: "",
    },
    validationSchema: RenameTeamSchema,
    onSubmit: (values) => {
      formik.setSubmitting(true);

      setTimeout(() => {
        console.log(values);
        formik.resetForm();
        setVisibleRename(false);
        formik.setSubmitting(false);
      }, 2000);
    },
  });

  return (
    <>
      <div className="card flex gap-4 float-right">
        <Button
          ref={buttonElRename}
          onClick={() => setVisibleRename(true)}
          rounded
          outlined
          severity="secondary"
          icon="pi pi-pencil"
        />
        <Button
          ref={buttonElDelete}
          onClick={() => setVisibleDelete(true)}
          rounded
          outlined
          severity="danger"
          icon="pi pi-trash"
        />
      </div>
      <Dialog
        header="Rename Team"
        visible={visibleRename}
        className="w-[40vw]"
        onHide={() => setVisibleRename(false)}
      >
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-10">
          <div>
            <p>Are you sure you want to rename the team?</p>
          </div>
          <div className="w-full">
            <span className="p-float-label">
              <InputText
                id="newTeamName"
                {...formik.getFieldProps("newTeamName")}
                className="w-full"
              />
              <InputError
                touched={formik.touched.newTeamName}
                error={formik.errors.newTeamName}
              />
              <label htmlFor="newTeamName">New Team Name</label>
            </span>
          </div>
          <div className="flex justify-end items-center">
            <Button
              type="reset"
              label="No"
              icon="pi pi-times"
              onClick={() => setVisibleRename(false)}
              className="p-button-text"
              disabled={formik.isSubmitting}
            />
            <Button
              disabled={formik.isSubmitting || !formik.isValid}
              loading={formik.isSubmitting}
              type="submit"
              label="Yes"
              icon="pi pi-check"
              autoFocus
            />
          </div>
        </form>
      </Dialog>
      <ConfirmPopup
        target={buttonElDelete.current}
        visible={visibleDelete}
        onHide={() => setVisibleDelete(false)}
        message="Are you sure you want to delete the organization?"
        icon="pi pi-exclamation-triangle"
        accept={acceptDelete}
      />
    </>
  );
}
