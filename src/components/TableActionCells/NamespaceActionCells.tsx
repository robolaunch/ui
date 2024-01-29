import DeleteNamespaceModal from "../../modals/DeleteNamespaceModal";
import TableActionButtons from "../TableActionButtons/TableActionButtons";
import { IOrganization } from "../../interfaces/organization.interface";
import { IRegion } from "../../interfaces/region.interface";
import { Fragment, ReactElement, useState } from "react";
import { ICloudInstance } from "../../interfaces/cloudInstance.interface";

interface INSActionCells {
  data: {
    organization: IOrganization;
    roboticsCloud: IRegion;
    instance: ICloudInstance;
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
