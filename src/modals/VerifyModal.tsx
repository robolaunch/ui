import { Dialog } from "primereact/dialog";
import { ReactElement, useState } from "react";
import Button from "../components/Button/Button";

interface IVerifyModal {
  header: string;
  text: string;
  buttonText: string;
  loading?: boolean;
  disabled?: boolean;

  handleCloseModal: () => void;
  handleOnClick: () => void;
}

export default function VerifyModal({
  header,
  handleCloseModal,
  text,
  buttonText,
  loading,
  disabled,
  handleOnClick,
}: IVerifyModal): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Dialog
      header={header}
      visible={true}
      className="w-[40vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex w-full flex-col gap-8">
        <p className="text-sm">{text}</p>
        <div className="flex items-center justify-end gap-4">
          <Button
            className="!h-11 !w-44"
            type="submit"
            text={buttonText}
            loading={loading || isLoading}
            disabled={disabled}
            onClick={() => {
              setIsLoading(true);
              handleOnClick();
            }}
          />
        </div>
      </div>
    </Dialog>
  );
}
