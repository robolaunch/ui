import { MdOutlineStorage } from "react-icons/md";
import ContentLoader from "react-content-loader";
import { BsFillCpuFill } from "react-icons/bs";
import useRobot from "../../hooks/useRobot";
import { FaMemory } from "react-icons/fa";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";

export default function RobotResource(): ReactElement {
  const { responseRobot } = useRobot();
  const { pagesState } = useMain();

  return (
    <div data-tut="robot-resources" className="flex flex-col items-end pb-2">
      <div className="flex items-center gap-3 pt-2">
        <span className="text-center text-xs font-semibold">
          Virtual Resources:
        </span>
        <div className="col-span-1 flex items-center gap-2">
          <BsFillCpuFill size={16} color="#666666" />
          {pagesState?.instance?.cloudInstanceResource?.cpuTotal ? (
            <span className="text-xs font-light">
              {pagesState?.instance?.cloudInstanceResource?.cpuTotal} Core
              vGPU/MIG
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
          <FaMemory size={16} color="#666666" />

          {pagesState?.instance?.cloudInstanceResource?.memoryTotal ? (
            <span className="text-xs font-light">
              {pagesState?.instance?.cloudInstanceResource?.memoryTotal} GB
              Memory
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
              {responseRobot?.storageAmount} GB Storage
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
