import DeleteOrganizationModal from "../../modals/DeleteOrganizationModal";
import TableActionButtons from "../TableActionButtons/TableActionButtons";
import { IOrganization } from "../../interfaces/organization.interface";
import { envCreatableOrganization } from "../../helpers/envProvider";
import { Fragment, ReactElement, useState } from "react";

interface IOrganizationActionCells {
  data: IOrganization;
  reloadHandle: () => void;
}

export default function OrganizationActionCells({
  data,
  reloadHandle,
}: IOrganizationActionCells): ReactElement {
  const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);

  return (
    <Fragment>
      <TableActionButtons
        showDeleteButton
        disabledDeleteButton={!envCreatableOrganization}
        onClickDeleteButton={() => setVisibleDeleteModal(true)}
      />
      {visibleDeleteModal && (
        <DeleteOrganizationModal
          data={data}
          reloadHandle={reloadHandle}
          handleCloseModal={() => setVisibleDeleteModal(false)}
        />
      )}
    </Fragment>
  );
}
