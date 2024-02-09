import { ReactElement, useState } from "react";
import { RiListCheck } from "react-icons/ri";
import LogModal from "../../modals/LogModal";
import useMain from "../../hooks/useMain";

interface IServiceLogs {
  type: "ide" | "vdi" | "jupyterNotebook";
}

export default function ServiceLogs({ type }: IServiceLogs): ReactElement {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);
  const { robotData } = useMain();

  return (
    <button className=" transition-300 text-light-700 hover:scale-95 hover:text-primary-400">
      <div className="flex flex-col items-center gap-1">
        <RiListCheck size={16} onClick={() => setIsOpenedModal(true)} />
        <p className="whitespace-nowrap text-[0.62rem]">Service Logs</p>
      </div>
      {isOpenedModal && (
        <LogModal
          log={robotData.step1.services?.[type].log}
          header={`Service Logs (${(() => {
            switch (type) {
              case "ide":
                return "IDE";
              case "vdi":
                return "VDI";
              case "jupyterNotebook":
                return "Jupyter Notebook";
            }
          })()})`}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
