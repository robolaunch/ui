import { Dialog } from "primereact/dialog";
import React, { ReactElement } from "react";
import Button from "../components/Button/Button";
import {
  moveAdminAsUserFromOrganization,
  moveUserAsAdminToOrganization,
} from "../toolkit/OrganizationSlice";
import { useAppDispatch } from "../hooks/redux";

interface IChangeRoleModal {
  visibleModal: boolean;
  handleCloseModal: () => void;
  handleRefresh: () => void;
  activePage: any;
  data: any;
}

export default function ChangeRoleModal({
  visibleModal,
  handleCloseModal,
  handleRefresh,
  activePage,
  data,
}: IChangeRoleModal): ReactElement {
  const dispatch = useAppDispatch();

  function handleChangeRole() {
    if (activePage?.page === "organizationAdmins") {
      dispatch(
        moveAdminAsUserFromOrganization({
          name: "",
          organizationId: activePage?.selectedOrganization?.organizationId,
          invitedUserId: data?.userId,
        })
      );
    } else {
      dispatch(
        moveUserAsAdminToOrganization({
          name: "",
          organizationId: activePage?.selectedOrganization?.organizationId,
          invitedUserId: data?.userId,
        })
      );
    }
    handleRefresh && handleRefresh();
    handleCloseModal();
  }

  return (
    <Dialog
      header="Change Role"
      visible={visibleModal}
      className="w-[40vw]"
      onHide={() => handleCloseModal()}
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
            // disabled={changeRoleSubmitting}
            onClick={() => handleChangeRole()}
          />
        </div>
      </div>
    </Dialog>
  );
}
