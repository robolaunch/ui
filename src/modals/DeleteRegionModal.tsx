import { Dialog } from "primereact/dialog";
import { ReactElement, useState } from "react";
import Button from "../components/Button/Button";
import { IRegion } from "../interfaces/regionInterfaces";

interface IDeleteRegionModal {
  data: IRegion;
  handleReload: () => void;
  handleCloseModal: () => void;
}

export default function DeleteRegionModal({
  data,
  handleReload,
  handleCloseModal,
}: IDeleteRegionModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleDeleteRegion() {
    setIsLoading(true);
    setTimeout(() => {
      handleReload();
      handleCloseModal();
    }, 2000);
  }

  return (
    <Dialog
      header={`Delete Region`}
      visible={true}
      className="w-[40vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex w-full flex-col gap-8">
        <p>
          Are you sure you want to delete the region named "
          <span className="font-bold">{data?.name}</span>
          "? This action permanently deletes all objects underneath.
        </p>
        <div className="flex items-center justify-end gap-4">
          <Button
            className="!h-11 !w-44"
            type="submit"
            text={`Delete Region`}
            loading={isLoading}
            disabled={isLoading}
            onClick={() => handleDeleteRegion()}
          />
        </div>
      </div>
    </Dialog>
  );
}
