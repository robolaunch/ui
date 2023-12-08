import { ReactElement, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import useRobot from "../hooks/useRobot";

interface IFileBrowserModal {
  type: "ide" | "vdi";
  handleCloseModal: () => void;
}

export default function FileBrowserModal({
  type,
  handleCloseModal,
}: IFileBrowserModal): ReactElement {
  const { responseRobot } = useRobot();

  useEffect(() => {
    console.log(responseRobot);
  }, [responseRobot]);

  return (
    <Dialog
      header={`${type === "ide" ? "IDE" : "VDI"} File Manager`}
      visible={true}
      className="w-[90vw]"
      onHide={() => handleCloseModal()}
    >
      <iframe
        title="file-browser"
        src={
          type === "ide"
            ? responseRobot?.ideFileBrowserIngressEndpoint
            : responseRobot?.vdiFileBrowserIngressEndpoint
        }
        className="h-[80vh] w-full"
      />
    </Dialog>
  );
}
