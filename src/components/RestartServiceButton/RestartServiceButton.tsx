import RestartServiceModal from "../../modals/RestartServiceModal";
import { IoReloadOutline } from "react-icons/io5";
import { useState } from "react";

interface IRestartService {
  type: "ide" | "vdi" | "soft-vdi";
}

export default function RestartService({ type }: IRestartService) {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <button className="text-light-700 hover:text-primary-400 flex cursor-pointer flex-col items-center gap-1 transition-all duration-200 hover:scale-90">
      <IoReloadOutline size={20} onClick={() => setIsOpenedModal(true)} />
      <p className="text-[0.66rem]">{type === "soft-vdi" && "Soft"} Restart </p>
      {isOpenedModal && (
        <RestartServiceModal
          type={type}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
