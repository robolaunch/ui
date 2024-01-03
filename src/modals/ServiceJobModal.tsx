import { Editor } from "@monaco-editor/react";
import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";

interface IServiceJobModal {
  type: "ide" | "vdi" | "jupyter-notebook";
  handleCloseModal: () => void;
}

export default function ServiceJobModal({
  type,
  handleCloseModal,
}: IServiceJobModal): ReactElement {
  return (
    <Dialog
      header={`${type === "ide" ? "IDE" : "VDI"} Service Job`}
      visible={true}
      className="w-[80vw]"
      onHide={() => handleCloseModal()}
    >
      <div className="flex w-full flex-col gap-8">
        <Editor
          defaultLanguage="shell"
          value=""
          height="280px"
          theme="vs-dark"
          options={{
            readOnly: false,
            minimap: {
              enabled: false,
            },
            fontSize: 12,
            fontFamily: "monospace",
            lineDecorationsWidth: 10,
            wordWrap: "on",
            lineNumbersMinChars: 3,
            folding: false,
            padding: {
              top: 6,
              bottom: 6,
            },
          }}
        />
      </div>
    </Dialog>
  );
}
