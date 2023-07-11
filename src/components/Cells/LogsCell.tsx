import React, { Fragment, ReactElement, useState } from "react";
import LogsModal from "../../modals/LogsModal";

interface ILogsCell {
  log: string;
}

export default function LogsCell({ log }: ILogsCell): ReactElement {
  const [isShowLogsModal, setIsShowLogsModal] = useState<boolean>(false);

  return (
    <Fragment>
      <div
        className="text-xs cursor-pointer hover:underline "
        onClick={() => {
          setIsShowLogsModal(true);
        }}
      >
        Show Logs
      </div>
      {isShowLogsModal && (
        <LogsModal
          log={log}
          handleCloseModal={() => setIsShowLogsModal(false)}
        />
      )}
    </Fragment>
  );
}
