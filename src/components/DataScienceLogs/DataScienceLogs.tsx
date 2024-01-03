import ServiceLogModal from "../../modals/ServiceLogModal";
import { ReactElement, useState } from "react";

interface IDataScienceLogs {
  log: string;
}

export default function DataScienceLogs({
  log,
}: IDataScienceLogs): ReactElement {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <button className="flex cursor-pointer flex-col items-center gap-1 text-light-700 underline transition-all duration-200  hover:text-primary-400">
      <p
        onClick={() => setIsOpenedModal(true)}
        className="whitespace-nowrap text-xs"
      >
        Service Logs
      </p>
      {isOpenedModal && (
        <ServiceLogModal
          log={log}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
