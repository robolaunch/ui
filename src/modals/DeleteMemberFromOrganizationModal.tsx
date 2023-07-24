import { useFormik } from "formik";
import { Dialog } from "primereact/dialog";
import React, { ReactElement } from "react";
import InputText from "../components/InputText/InputText";
import InputError from "../components/InputError/InputError";
import Button from "../components/Button/Button";
import { deleteUserFromOrganizationSchema } from "../validations/UsersValidations";
import {
  deleteAdminFromOrganization,
  deleteGuestFromOrganization,
  deleteUserFromOrganization,
} from "../toolkit/OrganizationSlice";
import { useAppDispatch } from "../hooks/redux";

interface IDeleteMemberFromOrganizationModal {
  activePage: any;
  data: any;
  visibleModal: boolean;
  handleCloseModal: () => void;
  handleRefresh: () => void;
}

export default function DeleteMemberFromOrganizationModal({
  activePage,
  data,
  visibleModal,
  handleCloseModal,
  handleRefresh,
}: IDeleteMemberFromOrganizationModal): ReactElement {
  const dispatch = useAppDispatch();

  const deleteFormik = useFormik({
    initialValues: {
      username: data?.username,
    },
    validationSchema: deleteUserFromOrganizationSchema(data?.username),
    onSubmit: () => {
      deleteFormik.setSubmitting(true);

      switch (activePage?.page) {
        case "organizationAdmins":
          dispatch(
            deleteAdminFromOrganization({
              name: "",
              organizationId: activePage?.selectedOrganization?.organizationId,
              invitedUserId: data?.userId,
            })
          );
          break;
        case "organizationUsers":
          dispatch(
            deleteUserFromOrganization({
              name: "",
              organizationId: activePage?.selectedOrganization?.organizationId,
              invitedUserId: data?.userId,
            })
          );
          break;
        case "organizationGuests":
          dispatch(
            deleteGuestFromOrganization({
              name: "",
              organizationId: activePage?.selectedOrganization?.organizationId,
              invitedUserId: data?.userId,
            })
          );
          break;
      }
      deleteFormik.resetForm();
      handleRefresh && handleRefresh();
      deleteFormik.setSubmitting(false);
      handleCloseModal();
    },
  });

  return (
    <Dialog
      header="Delete User from Organization"
      visible={visibleModal}
      className="w-[40vw]"
      onHide={() => handleCloseModal()}
    >
      <form
        onSubmit={deleteFormik.handleSubmit}
        className="w-full flex flex-col gap-8"
      >
        <p className="text-sm">
          Are you sure you want to delete this user from the{" "}
          {activePage?.page === "organizationAdmins"
            ? "organization admins"
            : activePage?.page === "organizationUsers"
            ? "organization users"
            : "organization guests"}
          ?
        </p>
        <div className="w-full">
          <InputText
            {...deleteFormik.getFieldProps("username")}
            placeholder="Username"
            disabled={deleteFormik.isSubmitting}
          />
          <InputError
            touched={deleteFormik.touched.username}
            error={deleteFormik.errors.username}
          />
        </div>
        <div className="flex justify-end items-center gap-4">
          <Button
            className="!w-56 !h-11"
            type="submit"
            text="Delete User from Organization"
            disabled={deleteFormik.isSubmitting || !deleteFormik.isValid}
          />
        </div>
      </form>
    </Dialog>
  );
}
