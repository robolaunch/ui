import { ReactElement, useState } from "react";
import { RiSettings3Line } from "react-icons/ri";
import ServiceJobModal from "../../modals/ServiceJobModal";

interface IServiceJobs {
  type: "vdi" | "ide";
}

export default function ServiceJobs({ type }: IServiceJobs): ReactElement {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <button className="flex cursor-pointer flex-col items-center gap-1 text-light-700 transition-all duration-200 hover:scale-90 hover:text-primary-400">
      <RiSettings3Line size={16} onClick={() => setIsOpenedModal(true)} />
      <p className="text-[0.62rem]">Jobs</p>
      {isOpenedModal && (
        <ServiceJobModal
          type={type}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
