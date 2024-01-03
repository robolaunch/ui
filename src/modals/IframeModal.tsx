import { ReactElement } from "react";
import { Dialog } from "primereact/dialog";

interface IIframeModal {
  header?: string;
  url: string;
  handleCloseModal: () => void;
}

export default function IframeModal({
  header,
  url,
  handleCloseModal,
}: IIframeModal): ReactElement {
  return (
    <Dialog
      header={header}
      visible={true}
      className="h-full w-[90vw]"
      onHide={() => handleCloseModal()}
    >
      <iframe
        title="Iframe"
        src={url}
        style={{ height: "752px", width: "100%" }}
      />
    </Dialog>
  );
}
