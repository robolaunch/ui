import ServiceLogModal from "../../modals/ServiceLogModal";
import { ReactElement, useState } from "react";
import { RiListCheck } from "react-icons/ri";

interface IServiceLogs {
  type: "vdi" | "ide";
}

export default function ServiceLogs({ type }: IServiceLogs): ReactElement {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <button className="flex cursor-pointer flex-col items-center gap-1 text-light-700 transition-all duration-200 hover:scale-90 hover:text-primary-400">
      <RiListCheck size={16} onClick={() => setIsOpenedModal(true)} />
      <p className="whitespace-nowrap text-[0.62rem]">Service Logs</p>
      {isOpenedModal && (
        <ServiceLogModal
          type={type}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
