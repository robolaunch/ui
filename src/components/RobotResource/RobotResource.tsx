import React, { ReactElement } from "react";
import { BsFillCpuFill } from "react-icons/bs";
import ContentLoader from "react-content-loader";
import { FaMemory } from "react-icons/fa";
import { MdOutlineStorage } from "react-icons/md";
import useGeneral from "../../hooks/useGeneral";

interface IRobotResource {
  responseRobot: any;
}

export default function RobotResource({
  responseRobot,
}: IRobotResource): ReactElement {
  const { pagesState } = useGeneral();

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-3 pt-6">
        <span className="text-xs text-center font-semibold">
          Virtual Resources:
        </span>
        <div className="col-span-1 flex items-center gap-2">
          <BsFillCpuFill size={16} color="#666666" />
          {pagesState?.instance?.cloudInstanceResource?.cpuTotal ? (
            <span className="text-xs font-light">
              {pagesState?.instance?.cloudInstanceResource?.cpuTotal} Core
            </span>
          ) : (
            <ContentLoader
              speed={1}
              width={48}
              height={12}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <rect width="48" height="12" />
            </ContentLoader>
          )}
        </div>
        <div className="col-span-1 flex items-center gap-2">
          <BsFillCpuFill size={16} color="#666666" />
          {pagesState?.instance?.cloudInstanceResource?.cpuTotal ? (
            <span className="text-xs font-light">1T4 GPU</span>
          ) : (
            <ContentLoader
              speed={1}
              width={64}
              height={12}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <rect width="64" height="12" />
            </ContentLoader>
          )}
        </div>
        <div className="col-span-1 flex items-center gap-2">
          <FaMemory size={16} color="#666666" />

          {pagesState?.instance?.cloudInstanceResource?.memoryTotal ? (
            <span className="text-xs font-light">
              {pagesState?.instance?.cloudInstanceResource?.memoryTotal} GB
            </span>
          ) : (
            <ContentLoader
              speed={1}
              width={48}
              height={12}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <rect width="48" height="12" />
            </ContentLoader>
          )}
        </div>
        <div className="col-span-1 flex items-center gap-2">
          <MdOutlineStorage size={16} color="#666666" />

          {responseRobot?.storageAmount ? (
            <span className="text-xs font-light">
              {responseRobot?.storageAmount} GB
            </span>
          ) : (
            <ContentLoader
              speed={1}
              width={48}
              height={12}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
            >
              <rect width="48" height="12" />
            </ContentLoader>
          )}
        </div>
      </div>
    </div>
  );
}
