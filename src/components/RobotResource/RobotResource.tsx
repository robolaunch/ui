import React, { ReactElement } from "react";
import { BsFillCpuFill } from "react-icons/bs";
import usePages from "../../hooks/usePages";
import ContentLoader from "react-content-loader";
import { FaMemory } from "react-icons/fa";
import { MdOutlineStorage } from "react-icons/md";

interface IRobotResource {
  responseRobot: any;
}

export default function RobotResource({
  responseRobot,
}: IRobotResource): ReactElement {
  const { pagesState } = usePages();

  console.log("GGGGG", pagesState);
  console.log("responseRobot", responseRobot);

  const resources = {
    virtual: {
      cpu: `${pagesState?.instance?.cloudInstanceResource?.cpuTotal} CPU`,
      gpu: "1T4 GPU",
      ram: `${pagesState?.instance?.cloudInstanceResource?.memoryTotal} GB`,
      storage: `${responseRobot?.storageAmount} GB`,
    },
    physical: {
      cpu: "Null",
      gpu: "Null",
      ram: "Null",
      storage: "Null",
    },
  };

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-3 pt-6">
        <span className="text-xs text-center font-semibold">
          Virtual Resources:
        </span>
        <div className="col-span-1 flex items-center gap-2">
          <BsFillCpuFill size={16} color="#666666" />
          <span className="text-xs font-light">
            {resources?.virtual?.cpu || (
              <ContentLoader
                speed={1}
                width={92}
                height={12}
                backgroundColor="#f6f6ef"
                foregroundColor="#e8e8e3"
              >
                <rect width="92" height="12" />
              </ContentLoader>
            )}
          </span>
        </div>
        <div className="col-span-1 flex items-center gap-2">
          <BsFillCpuFill size={16} color="#666666" />
          <span className="text-xs font-light">{resources?.virtual?.gpu}</span>
        </div>{" "}
        <div className="col-span-1 flex items-center gap-2">
          <FaMemory size={16} color="#666666" />
          <span className="text-xs font-light">{resources?.virtual?.ram}</span>
        </div>{" "}
        <div className="col-span-1 flex items-center gap-2">
          <MdOutlineStorage size={16} color="#666666" />
          <span className="text-xs font-light">
            {resources?.virtual?.storage}
          </span>
        </div>
      </div>
    </div>
  );
}
