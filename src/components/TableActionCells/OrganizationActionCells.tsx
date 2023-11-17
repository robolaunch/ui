import DeleteOrganizationModal from "../../modals/DeleteOrganizationModal";
import { envCreateOrganization } from "../../helpers/envProvider";
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
        showDeleteButton={envCreateOrganization}
        disabledDeleteButton={!envCreateOrganization}
        onClickDeleteButton={() => setVisibleDeleteModal(true)}
      />
      {visibleDeleteModal && (
        <DeleteOrganizationModal
          data={data}
          reload={reloadHandle}
          handleCloseModal={() => setVisibleDeleteModal(false)}
        />
      )}
    </Fragment>
  );
}
