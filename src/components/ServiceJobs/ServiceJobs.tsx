import { ReactElement, useState } from "react";
import { RiSettings3Line } from "react-icons/ri";
import ServiceJobModal from "../../modals/ServiceJobModal";

interface IServiceJobs {
  type: "vdi" | "ide";
}

export default function ServiceJobs({ type }: IServiceJobs): ReactElement {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <button className="text-light-700 hover:text-primary-400 flex cursor-pointer flex-col items-center gap-1 transition-all duration-200 hover:scale-90">
      <RiSettings3Line size={20} onClick={() => setIsOpenedModal(true)} />
      <p className="text-[0.66rem]">Jobs</p>
      {isOpenedModal && (
        <ServiceJobModal
          type={type}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
