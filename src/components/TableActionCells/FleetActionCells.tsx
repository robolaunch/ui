import TableActionButtons from "../TableActionButtons/TableActionButtons";
import { IOrganization } from "../../interfaces/organization.interface";
import DeleteFleetModalModal from "../../modals/DeleteFleetModal";
import { IRegion } from "../../interfaces/region.interface";
import { Fragment, ReactElement, useState } from "react";
import { ICloudInstance } from "../../interfaces/cloudInstance.interface";

interface IFleetActionCells {
  data: {
    organization: IOrganization;
    roboticsCloud: IRegion;
    instance: ICloudInstance;
    fleet: any;
  };
  reload: () => void;
}

export default function FleetActionCells({
  data,
  reload,
}: IFleetActionCells): ReactElement {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  return (
    <Fragment>
      <TableActionButtons
        showDeleteButton
        onClickDeleteButton={() => setIsDeleteModalVisible(true)}
      />

      {isDeleteModalVisible && (
        <DeleteFleetModalModal
          data={data || undefined}
          reload={reload}
          handleCloseModal={() => setIsDeleteModalVisible(false)}
        />
      )}
    </Fragment>
  );
}
