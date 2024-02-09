import { ReactElement } from "react";
import { Dialog } from "primereact/dialog";
import useMain from "../hooks/useMain";

interface IFileBrowserModal {
  type: "ide" | "vdi" | "jupyterNotebook";
  handleCloseModal: () => void;
}

export default function FileBrowserModal({
  type,
  handleCloseModal,
}: IFileBrowserModal): ReactElement {
  const { robotData } = useMain();

  return (
    <Dialog
      header={`${type === "ide" ? "IDE" : "VDI"} File Manager`}
      visible={true}
      className="h-full w-[90vw]"
      onHide={() => handleCloseModal()}
    >
      <iframe
        title="file-browser"
        src={robotData.step1?.services?.[type]?.fileManagerEndpoint}
        className="h-[80vh] w-full"
      />
    </Dialog>
  );
}
