import RestartServiceModal from "../../modals/RestartServiceModal";
import { IoReloadOutline } from "react-icons/io5";
import { useState } from "react";

interface IRestartService {
  type: "ide" | "vdi" | "soft-vdi";
}

export default function RestartService({ type }: IRestartService) {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <button className="flex cursor-pointer flex-col items-center gap-1 text-light-700 transition-all duration-200 hover:scale-90 hover:text-primary-400">
      <IoReloadOutline size={16} onClick={() => setIsOpenedModal(true)} />
      <p className="whitespace-nowrap text-[0.62rem]">
        {type === "soft-vdi" && "Soft"}Service Restart{" "}
      </p>
      {isOpenedModal && (
        <RestartServiceModal
          type={type}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
