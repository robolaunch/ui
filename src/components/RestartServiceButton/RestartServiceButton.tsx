import RestartServiceModal from "../../modals/RestartServiceModal";
import { IoReloadOutline } from "react-icons/io5";
import { useState } from "react";

interface IRestartService {
  type: "ide" | "vdi" | "soft-vdi" | "jupyterNotebook";
}

export default function RestartService({ type }: IRestartService) {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <button className=" text-light-700 transition-all duration-300 hover:scale-95 hover:text-primary-400">
      <div
        className="flex flex-col items-center gap-1"
        onClick={() => setIsOpenedModal(true)}
      >
        <IoReloadOutline size={16} />
        <p className="whitespace-nowrap text-[0.62rem]">
          {type === "soft-vdi" && "Soft"} Service Restart
        </p>
      </div>
      {isOpenedModal && (
        <RestartServiceModal
          type={type}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
