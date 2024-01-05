import { Fragment, ReactElement, useState } from "react";
import DeleteRegionModal from "../../modals/DeleteRegionModal";
import { envCreatableRegion } from "../../helpers/envProvider";
import { IRegion } from "../../interfaces/regionInterfaces";
import TableActionButtons from "../TableActionButtons/TableActionButtons";

interface IRegionsActionCells {
  data: IRegion;
  handleReload: () => void;
}

export default function RegionsActionCells({
  data,
  handleReload,
}: IRegionsActionCells): ReactElement {
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  return (
    <Fragment>
      <TableActionButtons
        showDeleteButton
        disabledDeleteButton={!envCreatableRegion}
        onClickDeleteButton={() => setIsDeleteModalVisible(true)}
      />
      {isDeleteModalVisible && (
        <DeleteRegionModal
          data={data}
          handleReload={handleReload}
          handleCloseModal={() => setIsDeleteModalVisible(false)}
        />
      )}
    </Fragment>
  );
}
