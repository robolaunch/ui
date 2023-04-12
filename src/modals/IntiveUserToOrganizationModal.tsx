import { useFormik } from "formik";
import { Dialog } from "primereact/dialog";
import React, { Fragment, ReactElement } from "react";
import InputText from "../components/InputText/InputText";
import InputError from "../components/InputError/InputError";
import Button from "../components/Button/Button";
import InputSelect from "../components/InputSelect/InputSelect";

interface IInviteUserToOrganizationModal {
  visibleModal: boolean;
  handleCloseModal: () => void;
  organizations: any;
}

export default function InviteUserToOrganizationModal({
  visibleModal,
  handleCloseModal,
  organizations,
}: IInviteUserToOrganizationModal): ReactElement {
  const formik = useFormik({
    initialValues: {
      organization: null,
      email: "",
      username: "",
      firstName: "",
      lastName: "",
    },

    onSubmit: (values: any) => {},
  });

  return (
    <Dialog
      header="Invite User"
      visible={visibleModal}
      className="w-[40vw]"
      onHide={() => handleCloseModal()}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-8"
      >
        <p className="text-sm">
          Are you sure you want to invite this user to an organization?
        </p>
        <div className="w-full">
          <InputText
            {...formik.getFieldProps("username")}
            placeholder="Username"
            disabled={formik.isSubmitting}
          />
          <InputError
            touched={formik.touched.username}
            error={formik.errors.username}
          />
        </div>
        <div className="w-full">
          <InputSelect
            {...formik.getFieldProps("organization")}
            placeholder="Organization"
            disabled={formik.isSubmitting}
          >
            <Fragment>
              {formik.values.organization === null && (
                <option value=""></option>
              )}
              {organizations?.map((organization: any) => (
                <option key={organization.id} value={organization.id}>
                  {organization.name}
                </option>
              ))}
            </Fragment>
          </InputSelect>
          <InputError
            touched={formik.touched.username}
            error={formik.errors.username}
          />
        </div>
        <div className="flex justify-end items-center gap-4">
          <Button
            className="!w-56 !h-11"
            type="submit"
            text="Delete User to Organization"
            disabled={formik.isSubmitting || !formik.isValid}
          />
        </div>
      </form>
    </Dialog>
  );
}
