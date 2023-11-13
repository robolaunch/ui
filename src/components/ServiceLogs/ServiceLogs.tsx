import ServiceLogModal from "../../modals/ServiceLogModal";
import { ReactElement, useState } from "react";
import { RiListCheck } from "react-icons/ri";

interface IServiceLogs {
  type: "vdi" | "ide";
}

export default function ServiceLogs({ type }: IServiceLogs): ReactElement {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <button className="flex cursor-pointer flex-col items-center gap-1 text-layer-light-700 transition-all duration-200 hover:scale-90 hover:text-layer-primary-400">
      <RiListCheck size={20} onClick={() => setIsOpenedModal(true)} />
      <p className="text-[0.66rem]">Logs</p>
      {isOpenedModal && (
        <ServiceLogModal
          type={type}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
