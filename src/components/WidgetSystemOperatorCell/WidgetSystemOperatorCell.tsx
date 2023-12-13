import { Fragment, ReactElement, useState } from "react";
import useMain from "../../hooks/useMain";
import StateCell from "../TableInformationCells/StateCell";
import LogModal from "../../modals/LogModal";
import { RxOpenInNewWindow } from "react-icons/rx";

export default function WidgetSystemOperatorCell(): ReactElement {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { pagesState } = useMain();

  return (
    <Fragment>
      <div className="flex items-center justify-center">
        <div className="flex  h-full w-full flex-col items-center justify-evenly gap-4">
          <p className="text-xs font-medium">System Status (Operator)</p>
          <div className="flex flex-col gap-2">
            <StateCell
              state={
                pagesState?.instance?.systemStatus?.[0]?.status || "Pending"
              }
            />
          </div>
          <p
            className="flex cursor-pointer items-center gap-1 hover:underline"
            onClick={() => setIsOpenModal(true)}
            style={{
              fontSize: "0.66rem",
              lineHeight: "0.75rem",
            }}
          >
            Logs
            <RxOpenInNewWindow size={14} />
          </p>
        </div>
      </div>
      {isOpenModal && (
        <LogModal
          log={pagesState?.instance?.systemStatus?.[0]?.log}
          handleCloseModal={() => setIsOpenModal(false)}
        />
      )}
    </Fragment>
  );
}
