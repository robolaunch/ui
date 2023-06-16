import React, { ReactElement } from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

interface IRobotStatusWidgetItem {
  title: string;
  loading: boolean;
  state: string;
  stateTextLoading: boolean;
  stateText: string;
}

export default function RobotStatusWidgetItem({
  title,
  loading,
  state,
  stateTextLoading,
  stateText,
}: IRobotStatusWidgetItem): ReactElement {
  return (
    <div className="flex flex-col gap-6 items-center justify-center font-medium text-sm text-layer-dark-600">
      <span>{title}</span>
      <div className="flex flex-col justify-center items-center gap-2">
        {loading ? (
          <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
            <img
              className="w-12 mx-auto"
              src="/svg/general/loading.svg"
              alt="Loading..."
            />
          </div>
        ) : state === "success" ? (
          <FiCheckCircle size={28} className="text-green-500" />
        ) : state === "warning" ? (
          <FiAlertCircle size={28} className="text-yellow-500" />
        ) : (
          <FiAlertCircle size={28} className="text-red-500" />
        )}

        <div className="flex items-center gap-2">
          {stateTextLoading && (
            <img
              className="w-4 scale-[2.5]"
              src="/svg/general/loading.svg"
              alt="Loading..."
            />
          )}
          <span className="text-xs">{stateText}</span>
        </div>
      </div>
    </div>
  );
}
