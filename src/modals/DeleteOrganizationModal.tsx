import Button from "../components/Button/Button";
import { ReactElement, useState } from "react";
import { Dialog } from "primereact/dialog";
import { IOrganization } from "../interfaces/organization.interface";

interface IDeleteOrganizationModal {
  data: IOrganization;
  reloadHandle: () => void;
  handleCloseModal: () => void;
}

export default function DeleteOrganizationModal({
  data,
  reloadHandle,
  handleCloseModal,
}: IDeleteOrganizationModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  function handleDeleteOrganization() {
    setIsLoading(true);
    setIsDisabled(true);
    setTimeout(() => {
      reloadHandle();
      handleCloseModal();
    }, 2000);
  }

  return (
    <Dialog
      header="Delete Organization"
      visible={true}
      className="w-[40vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex w-full flex-col gap-8">
        <p>
          Are you sure you want to delete the organization named "
          <span className="font-bold">{data?.name?.split("_")[1]}</span>
          "? This action permanently deletes all objects underneath.
        </p>
        <div className="flex items-center justify-end gap-4">
          <Button
            className="!h-11 !w-44"
            type="submit"
            loading={isLoading}
            text={`Delete Organization`}
            disabled={isDisabled}
            onClick={() => handleDeleteOrganization()}
          />
        </div>
      </div>
    </Dialog>
  );
}
