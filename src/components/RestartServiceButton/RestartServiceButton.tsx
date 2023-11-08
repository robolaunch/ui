import React, { useState } from "react";
import RestartServiceModal from "../../modals/RestartServiceModal";
import { IoReloadOutline } from "react-icons/io5";

interface IRestartService {
  type: "ide" | "vdi" | "soft-vdi";
}

export default function RestartService({ type }: IRestartService) {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <button className="flex cursor-pointer flex-col items-center gap-1 text-layer-light-700 transition-all duration-200 hover:scale-90 hover:text-layer-primary-400">
      <IoReloadOutline size={24} onClick={() => setIsOpenedModal(true)} />
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
