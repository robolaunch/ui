import React, { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import { BiTrash, BiPencil } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import DeleteOrganizationModal from "../../modals/DeleteOrganizationModal";
import RenameOrganizationModal from "../../modals/RenameOrganizationModal";
import { envOnPremiseRobot } from "../../helpers/envProvider";
interface IOrganizationActionCells {
  data: any;
  reload: () => void;
  onClickSee?: any;
}

export default function OrganizationActionCells({
  data,
  reload,
  onClickSee,
}: IOrganizationActionCells): ReactElement {
  const [visibleRenameModal, setVisibleRenameModal] = useState<boolean>(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="card flex gap-4 float-right">
        {onClickSee && (
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
        )}
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-layer-primary-500 disabled:!border-layer-light-500"
          text={
            <BiPencil
              className={`${
                envOnPremiseRobot
                  ? "text-layer-light-500"
                  : "text-layer-primary-500"
              }`}
            />
          }
          onClick={() => setVisibleRenameModal(true)}
          disabled={envOnPremiseRobot}
        />
        <Button
          className="!w-8 !h-8 !bg-transparent !border !border-red-600 disabled:!border-layer-light-500"
          text={
            <BiTrash
              className={`${
                envOnPremiseRobot ? "text-layer-light-500" : "text-red-600"
              }`}
            />
          }
          onClick={() => setVisibleDeleteModal(true)}
          disabled={envOnPremiseRobot}
        />
      </div>
      {visibleRenameModal && (
        <RenameOrganizationModal
          data={data}
          visibleModal={visibleRenameModal}
          reload={reload}
          handleCloseModal={() => setVisibleRenameModal(false)}
        />
      )}
      {visibleDeleteModal && (
        <DeleteOrganizationModal
          data={data}
          visibleModal={visibleDeleteModal}
          reload={reload}
          handleCloseModal={() => setVisibleDeleteModal(false)}
        />
      )}
    </Fragment>
  );
}
