import TableActionButtons from "../TableActionButtons/TableActionButtons";
import { IOrganization } from "../../interfaces/organization.interface";
import DeleteFleetModalModal from "../../modals/DeleteFleetModal";
import { IInstance } from "../../interfaces/instanceInferfaces";
import { IRegion } from "../../interfaces/regionInterfaces";
import { Fragment, ReactElement, useState } from "react";

interface IFleetActionCells {
  data: {
    organization: IOrganization;
    roboticsCloud: IRegion;
    instance: IInstance;
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
