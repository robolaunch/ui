import { Fragment, ReactElement, useState } from "react";
import StateCell from "../TableInformationCells/StateCell";
import { RxOpenInNewWindow } from "react-icons/rx";
import ServiceLogModal from "../../modals/ServiceLogModal";

interface IWidgetSystemCell {
  title: string;
  data: {
    log: string;
    status: string;
  };
}

export default function WidgetSystemCell({
  title,
  data,
}: IWidgetSystemCell): ReactElement {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="flex items-center justify-center">
        <div className="flex  h-full w-full flex-col items-center justify-evenly gap-4">
          <p className="text-xs font-medium">{title}</p>
          <div className="flex flex-col gap-3">
            <StateCell state={data?.status || "Pending"} />
          </div>
          <p
            className="flex cursor-pointer items-center gap-1 hover:underline"
            style={{
              fontSize: "0.66rem",
              lineHeight: "0.75rem",
            }}
            onClick={() => setIsOpenModal(true)}
          >
            Logs
            <RxOpenInNewWindow size={14} />
          </p>
        </div>
      </div>
      {isOpenModal && (
        <ServiceLogModal
          header={title}
          log={data?.log}
          handleCloseModal={() => setIsOpenModal(false)}
        />
      )}
    </Fragment>
  );
}
