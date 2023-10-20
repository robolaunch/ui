import React, { useState } from "react";
import RestartServiceModal from "../../modals/RestartServiceModal";
import { PiWarningLight } from "react-icons/pi";

interface IRestartService {
  type: string;
}

export default function RestartService({ type }: IRestartService) {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <>
      <PiWarningLight
        size={26}
        className="transition-300 cursor-pointer text-yellow-600 hover:text-yellow-700"
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
