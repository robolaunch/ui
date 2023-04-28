import React, { Fragment, ReactElement, useContext, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import { BiTrash, BiPencil } from "react-icons/bi";
import { deleteUserFromOrganizationSchema } from "../../validations/UsersValidations";
import { ApiContext } from "../../contexts/ApiContext";
import { Api } from "../../types/types";
import toastApiNotifaction from "../../tools/toastApiNotifaction";
interface IUserActionCells {
  data: any;
  onClickSee: any;
  activePage: any;
  handleRefresh: () => void;
}

export default function UserActionCells({
  data,
  activePage,
  handleRefresh,
}: IUserActionCells): ReactElement {
  const [visibleChangeRoleModal, setVisibleChangeRoleModal] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [changeRoleSubmitting, setChangeRoleSubmitting] = useState(false);
  const { api }: Api = useContext(ApiContext);

  function handleChangeRole() {
    setChangeRoleSubmitting(true);
    if (activePage?.page === "organizationAdmins") {
      api
        .moveAdminAsUserFromOrganization({
          name: "",
          organizationId: activePage?.selectedOrganization?.organizationId,
          invitedUserId: data?.userId,
        })
        .then((res: any) => toastApiNotifaction({ res: res }));
    } else {
      api
        .moveUserAsAdminToOrganization({
          name: "",
          organizationId: activePage?.selectedOrganization?.organizationId,
          invitedUserId: data?.userId,
        })
        .then((res: any) => toastApiNotifaction({ res: res }));
    }
    handleRefresh && handleRefresh();
    setChangeRoleSubmitting(false);
    setVisibleChangeRoleModal(false);
  }

  const deleteFormik = useFormik({
    initialValues: {
      username: data?.username,
    },
    validationSchema: deleteUserFromOrganizationSchema(data?.username),
    onSubmit: (values) => {
      deleteFormik.setSubmitting(true);

      switch (activePage?.page) {
        case "organizationAdmins":
          api
            .deleteAdminFromOrganization({
              name: "",
              organizationId: activePage?.selectedOrganization?.organizationId,
              invitedUserId: data?.userId,
            })
            .then((res: any) => toastApiNotifaction({ res: res }));
          break;
        case "organizationUsers":
          api
            .deleteUserFromOrganization({
              name: "",

              organizationId: activePage?.selectedOrganization?.organizationId,
              invitedUserId: data?.userId,
            })
            .then((res: any) => toastApiNotifaction({ res: res }));
          break;
        case "organizationGuests":
          api
            .deleteGuestFromOrganization({
              name: "",
              organizationId: activePage?.selectedOrganization?.organizationId,
              invitedUserId: data?.userId,
            })
            .then((res: any) => toastApiNotifaction({ res: res }));
          break;
      }

      deleteFormik.resetForm();
      handleRefresh && handleRefresh();
      deleteFormik.setSubmitting(false);
      setVisibleDelete(false);
    },
  });

  return (
    <Fragment>
      <div className="card flex gap-4 float-right">
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-layer-primary-500"
          text={<BiPencil className="text-layer-primary-500" />}
          onClick={() => setVisibleChangeRoleModal(true)}
        />
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-red-600"
          text={<BiTrash className="text-red-600" />}
          onClick={() => setVisibleDelete(true)}
        />
      </div>
      <Dialog
        header="Change Role"
        visible={visibleChangeRoleModal}
        className="w-[40vw]"
        onHide={() => setVisibleChangeRoleModal(false)}
      >
        <div className="w-full flex flex-col gap-8">
          <p className="text-sm">
            This user now is{" "}
            <span className="font-semibold">
              "{activePage?.page === "organizationAdmins" ? "Admin" : "Member"}"
            </span>
            . Are you sure you want to change role to{" "}
            <span className="font-semibold">
              {activePage?.page === "organizationAdmins" ? "Member" : "Admin"}
            </span>
            ?
          </p>
          <div className="flex justify-end items-center gap-4">
            <Button
              className="!w-44 !h-11"
              type="submit"
              text={`Change Role to ${
                activePage?.page === "organizationAdmins" ? "Member" : "Admin"
              }`}
              disabled={changeRoleSubmitting}
              onClick={() => handleChangeRole()}
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        header="Delete User from Organization"
        visible={visibleDelete}
        className="w-[40vw]"
        onHide={() => setVisibleDelete(false)}
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
    </Fragment>
  );
}
