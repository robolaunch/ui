import { Fragment, ReactElement, useState } from "react";
import useMain from "../../hooks/useMain";
import StateCell from "../TableInformationCells/StateCell";
import { RxOpenInNewWindow } from "react-icons/rx";
import ServiceLogModal from "../../modals/ServiceLogModal";

export default function WidgetSystemBackendCell(): ReactElement {
  const { pagesState } = useMain();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="flex items-center justify-center">
        <div className="flex  h-full w-full flex-col items-center justify-evenly gap-4">
          <p className="text-xs font-medium">System Status (Backend)</p>
          <div className="flex flex-col gap-3">
            <StateCell
              state={
                pagesState?.instance?.systemStatus?.[1]?.status || "Pending"
              }
            />
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
          log={pagesState?.instance?.systemStatus?.[1]?.log}
          handleCloseModal={() => setIsOpenModal(false)}
        />
      )}
    </Fragment>
  );
}
