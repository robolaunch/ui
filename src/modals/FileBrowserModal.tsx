import { ReactElement } from "react";
import { Dialog } from "primereact/dialog";
import useRobot from "../hooks/useRobot";
import useCreateRobot from "../hooks/useCreateRobot";

interface IFileBrowserModal {
  type: "ide" | "vdi" | "jupyter-notebook";
  handleCloseModal: () => void;
}

export default function FileBrowserModal({
  type,
  handleCloseModal,
}: IFileBrowserModal): ReactElement {
  const { responseRobot } = useRobot();

  const { robotData } = useCreateRobot();

  return (
    <Dialog
      header={`${type === "ide" ? "IDE" : "VDI"} File Manager`}
      visible={true}
      className="w-[90vw]"
      onHide={() => handleCloseModal()}
    >
      <iframe
        title="file-browser"
        src={(() => {
          switch (type) {
            case "ide":
              return responseRobot?.ideFileBrowserIngressEndpoint;
            case "vdi":
              return responseRobot?.vdiFileBrowserIngressEndpoint;
            case "jupyter-notebook":
              return robotData?.step1?.services.jupyterNotebook?.httpsEndpoint;
            default:
              return "";
          }
        })()}
        className="h-[80vh] w-full"
      />
    </Dialog>
  );
}
