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
      <div className="card flex gap-4 float-right">
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-layer-primary-500"
          text={<BiPencil className="text-layer-primary-500" />}
          onClick={() => setVisibleChangeRoleModal(true)}
        />
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-red-600"
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
