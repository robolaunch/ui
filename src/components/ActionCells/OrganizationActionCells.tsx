import React, { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import { BiTrash, BiPencil } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import DeleteOrganizationModal from "../../modals/DeleteOrganizationModal";
import RenameOrganizationModal from "../../modals/RenameOrganizationModal";
interface IOrganizationActionCells {
  data: any;
  onClickSee: any;
}

export default function OrganizationActionCells({
  data,
  onClickSee,
}: IOrganizationActionCells): ReactElement {
  const [visibleRenameModal, setVisibleRenameModal] = useState<boolean>(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="card flex gap-4 float-right">
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-layer-secondary-500 !ring-layer-secondary-500"
          text={<HiOutlineEye className="text-layer-secondary-500" />}
          onClick={() =>
            onClickSee({
              page: "organizationUsers",
              selectedOrganization: data,
            })
          }
        />
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-layer-primary-500"
          text={<BiPencil className="text-layer-primary-500" />}
          onClick={() => setVisibleRenameModal(true)}
        />
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-red-600"
          text={<BiTrash className="text-red-600" />}
          onClick={() => setVisibleDeleteModal(true)}
        />
      </div>
      {visibleRenameModal && (
        <RenameOrganizationModal
          data={data}
          visibleModal={visibleRenameModal}
          handleCloseModal={() => setVisibleRenameModal(false)}
        />
      )}
      {visibleDeleteModal && (
        <DeleteOrganizationModal
          data={data}
          visibleModal={visibleDeleteModal}
          handleCloseModal={() => setVisibleDeleteModal(false)}
        />
      )}
    </Fragment>
  );
}
