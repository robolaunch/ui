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
    <div className="text-light-600 flex flex-col items-center justify-center gap-6 text-sm font-medium">
      <span>{title}</span>
      <div className="flex flex-col items-center justify-center gap-2">
        {loading ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <ContentLoader
              speed={1}
              width={48}
              height={48}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <circle cx="24" cy="24" r={24} />
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
              width={96}
              height={14}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <rect rx={4} ry={4} width="96" height="14" />
            </ContentLoader>
          ) : (
            <span className="text-xs">{stateText}</span>
          )}
        </div>
      </div>
    </div>
  );
}
