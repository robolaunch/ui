import DeleteNamespaceModal from "../../modals/DeleteNamespaceModal";
import TableActionButtons from "../TableActionButtons/TableActionButtons";
import { IOrganization } from "../../interfaces/organization.interface";
import { IInstance } from "../../interfaces/instanceInferfaces";
import { IRegion } from "../../interfaces/regionInterfaces";
import { Fragment, ReactElement, useState } from "react";

interface INSActionCells {
  data: {
    organization: IOrganization;
    roboticsCloud: IRegion;
    instance: IInstance;
    fleet: any;
  };
  reload: () => void;
}

export default function NSActionCells({
  data,
  reload,
}: INSActionCells): ReactElement {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  return (
    <Fragment>
      <TableActionButtons
        showDeleteButton
        onClickDeleteButton={() => setIsDeleteModalVisible(true)}
      />

      {isDeleteModalVisible && (
        <DeleteNamespaceModal
          data={data || undefined}
          reload={reload}
          handleCloseModal={() => setIsDeleteModalVisible(false)}
        />
      )}
    </Fragment>
  );
}
