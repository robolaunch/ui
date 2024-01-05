import { ReactElement, useState } from "react";
import { RiFolder3Line } from "react-icons/ri";
import IframeModal from "../../modals/IframeModal";
import useCreateRobot from "../../hooks/useCreateRobot";

interface IFileBrowser {
  type: "ide" | "vdi" | "jupyterNotebook";
}

export default function FileBrowser({ type }: IFileBrowser): ReactElement {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  const { robotData } = useCreateRobot();

  return (
    <button className="transition-300 text-light-700 hover:scale-95 hover:text-primary-400">
      <div
        className="flex flex-col items-center gap-1"
        onClick={() => setIsOpenedModal(true)}
      >
        <RiFolder3Line size={16} />
        <p className="whitespace-nowrap text-[0.62rem]">File Manager</p>
      </div>
      {isOpenedModal && (
        <IframeModal
          header={`File Manager (${(() => {
            switch (type) {
              case "ide":
                return "IDE";
              case "vdi":
                return "VDI";
              case "jupyterNotebook":
                return "Jupyter Notebook";
            }
          })()})`}
          url={robotData?.step1?.services?.[type]?.fileManagerEndpoint}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
