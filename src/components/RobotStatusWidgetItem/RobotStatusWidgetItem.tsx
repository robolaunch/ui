import React, { ReactElement } from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import ContentLoader from "react-content-loader";
interface IRobotStatusWidgetItem {
  title: string;
  loading: boolean;
  state: string;
  stateText: string;
}

export default function RobotStatusWidgetItem({
  title,
  loading,
  state,
  stateText,
}: IRobotStatusWidgetItem): ReactElement {
  return (
    <div className="flex flex-col gap-6 items-center justify-center font-medium text-sm text-layer-dark-600">
      <span>{title}</span>
      <div className="flex flex-col justify-center items-center gap-2">
        {loading ? (
          <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
            <ContentLoader
              speed={1}
              width={32}
              height={32}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <circle cx="16" cy="16" r={16} />
            </ContentLoader>
          </div>
        ) : state === "success" ? (
          <FiCheckCircle size={28} className="text-green-500" />
        ) : state === "warning" ? (
          <FiAlertCircle size={28} className="text-yellow-500" />
        ) : state === "none" ? (
          <FiAlertCircle size={28} className="text-blue-500" />
        ) : (
          <FiAlertCircle size={28} className="text-red-500" />
        )}

        <div className="flex items-center gap-2">
          {stateText === "Loading..." ? (
            <ContentLoader
              speed={1}
              width={64}
              height={12}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <rect width="64" height="12" />
            </ContentLoader>
          ) : (
            <span className="text-xs">{stateText}</span>
          )}
        </div>
      </div>
    </div>
  );
}
