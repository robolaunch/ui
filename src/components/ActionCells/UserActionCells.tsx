import React, { Fragment, ReactElement, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import { BiTrash, BiPencil } from "react-icons/bi";
import { MoveAsAdmin, MoveToUser } from "../../resources/OrganizationSlice";
import { useAppDispatch } from "../../hooks/redux";
import { deleteUserFromOrganizationSchema } from "../../validations/UsersValidations";
interface IUserActionCells {
  data: any;
  onClickSee: any;
  activePage: any;
}

export default function UserActionCells({
  data,
  activePage,
}: IUserActionCells): ReactElement {
  const [visibleChangeRole, setVisibleChangeRole] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const dispatch = useAppDispatch();

  const changeRoleFormik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      changeRoleFormik.setSubmitting(true);
      if (activePage?.page === "organizationAdmins") {
        dispatch(
          MoveToUser({
            organizationId: activePage?.selectedOrganization?.organizationId,
            invitedUserId: data?.userId,
          })
        );
      } else {
        dispatch(
          MoveAsAdmin({
            organizationId: activePage?.selectedOrganization?.organizationId,
            invitedUserId: data?.userId,
          })
        );
      }
      changeRoleFormik.resetForm();
      setVisibleChangeRole(false);
      changeRoleFormik.setSubmitting(false);
    },
  });

  const deleteFormik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: deleteUserFromOrganizationSchema(data?.username),
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
          onClick={() => setVisibleChangeRole(true)}
        />
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-red-600"
          text={<BiTrash className="text-red-600" />}
          onClick={() => setVisibleDelete(true)}
        />
      </div>
      <Dialog
        header="Change Role"
        visible={visibleChangeRole}
        className="w-[40vw]"
        onHide={() => setVisibleChangeRole(false)}
      >
        <form
          onSubmit={changeRoleFormik.handleSubmit}
          className="w-full flex flex-col gap-8"
        >
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
              disabled={
                changeRoleFormik.isSubmitting || !changeRoleFormik.isValid
              }
            />
          </div>
        </form>
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
            Are you sure you want to delete this user from the organization?
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
              className="!w-44 !h-11"
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
