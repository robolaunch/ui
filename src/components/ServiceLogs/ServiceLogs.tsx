import ServiceLogModal from "../../modals/ServiceLogModal";
import { ReactElement, useState } from "react";
import { RiListCheck } from "react-icons/ri";
import useRobot from "../../hooks/useRobot";
import useCreateRobot from "../../hooks/useCreateRobot";

interface IServiceLogs {
  type: "ide" | "vdi" | "jupyter-notebook";
}

export default function ServiceLogs({ type }: IServiceLogs): ReactElement {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);
  const { responseRobot } = useRobot();
  const { robotData } = useCreateRobot();

  return (
    <button className="flex cursor-pointer flex-col items-center gap-1 text-light-700 transition-all duration-200 hover:scale-90 hover:text-primary-400">
      <RiListCheck size={16} onClick={() => setIsOpenedModal(true)} />
      <p className="whitespace-nowrap text-[0.62rem]">Service Logs</p>
      {isOpenedModal && (
        <ServiceLogModal
          log={(() => {
            switch (type) {
              case "ide":
                return responseRobot?.ideApplicationLog;
              case "vdi":
                return responseRobot?.vdiApplicationLog;
              case "jupyter-notebook":
                return robotData?.step1?.services.jupyterNotebook?.log;
              default:
                return "";
            }
          })()}
          header={type === "ide" ? "IDE" : "VDI"}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
