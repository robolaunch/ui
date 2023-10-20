import React, { useState } from "react";
import RestartServiceModal from "../../modals/RestartServiceModal";
import { IoReloadOutline } from "react-icons/io5";

interface IRestartService {
  type: string;
}

export default function RestartService({ type }: IRestartService) {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <>
      <IoReloadOutline
        size={26}
        className="cursor-pointer text-layer-light-700 transition-all duration-200 hover:scale-90 hover:text-layer-primary-400"
        onClick={() => setIsOpenedModal(true)}
      />

      {isOpenedModal && (
        <RestartServiceModal
          type={type}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </>
  );
}
