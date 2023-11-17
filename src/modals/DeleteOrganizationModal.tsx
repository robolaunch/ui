import Button from "../components/Button/Button";
import { ReactElement } from "react";
import { Dialog } from "primereact/dialog";
import { IOrganization } from "../interfaces/organizationInterfaces";

interface IDeleteOrganizationModal {
  data: IOrganization;
  reload: () => void;
  handleCloseModal: () => void;
}

export default function DeleteOrganizationModal({
  data,
  reload,
  handleCloseModal,
}: IDeleteOrganizationModal): ReactElement {
  const isLoading = false;

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
          <span className="font-bold">
            {data?.organizationName?.split("_")[1]}
          </span>
          "? This action permanently deletes all objects underneath.
        </p>
        <div className="flex items-center justify-end gap-4">
          <Button
            className="!h-11 !w-44"
            type="submit"
            text={
              isLoading ? (
                <img
                  className="h-10 w-10"
                  src="/svg/general/loading.svg"
                  alt="loading"
                />
              ) : (
                `Delete Organization`
              )
            }
            disabled={true}
          />
        </div>
      </div>
    </Dialog>
  );
}
