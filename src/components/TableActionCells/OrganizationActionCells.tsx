import DeleteOrganizationModal from "../../modals/DeleteOrganizationModal";
import { envCreatableOrganization } from "../../helpers/envProvider";
import { Fragment, ReactElement, useState } from "react";
import { IOrganization } from "../../interfaces/organizationInterfaces";
import TableActionButtons from "../TableActionButtons/TableActionButtons";

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
