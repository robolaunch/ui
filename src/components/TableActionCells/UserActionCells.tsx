import React, { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import { BiTrash, BiPencil } from "react-icons/bi";
import DeleteMemberFromOrganizationModal from "../../modals/DeleteMemberFromOrganizationModal";
import ChangeRoleModal from "../../modals/ChangeRoleModal";
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
  const [visibleChangeRoleModal, setVisibleChangeRoleModal] =
    useState<boolean>(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="card float-right flex gap-4">
        <Button
          className="!border-primary-500 !h-8 !w-8 !border !bg-transparent"
          text={<BiPencil className="text-primary-500" />}
          onClick={() => setVisibleChangeRoleModal(true)}
        />
        <Button
          className="!h-8 !w-8 !border !border-red-600 !bg-transparent"
          text={<BiTrash className="text-red-600" />}
          onClick={() => setVisibleDeleteModal(true)}
        />
      </div>
      {visibleChangeRoleModal && (
        <ChangeRoleModal
          activePage={activePage}
          data={data}
          handleCloseModal={() => setVisibleChangeRoleModal(false)}
          handleRefresh={handleRefresh}
          visibleModal={visibleChangeRoleModal}
        />
      )}
      {visibleDeleteModal && (
        <DeleteMemberFromOrganizationModal
          data={data}
          handleCloseModal={() => setVisibleDeleteModal(false)}
          handleRefresh={handleRefresh}
          visibleModal={visibleDeleteModal}
          activePage={activePage}
        />
      )}
    </Fragment>
  );
}
