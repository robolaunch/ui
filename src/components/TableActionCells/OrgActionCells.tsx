import DeleteOrganizationModal from "../../modals/DeleteOrganizationModal";
import TableActionButtons from "../TableActionButtons/TableActionButtons";
import { IOrganization } from "../../interfaces/global/organization.interface";
import { envCreatableOrganization } from "../../helpers/envProvider";
import { Fragment, ReactElement, useState } from "react";

interface IOrgActionCells {
  data: IOrganization;
  reloadHandle: () => void;
}

export default function OrgActionCells({
  data,
  reloadHandle,
}: IOrgActionCells): ReactElement {
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
