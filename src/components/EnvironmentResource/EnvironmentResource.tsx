import useCreateRobot from "../../hooks/useCreateRobot";
import { MdOutlineStorage } from "react-icons/md";
import { Fragment, ReactElement } from "react";
import { BsFillCpuFill } from "react-icons/bs";
import Skeleton from "../Skeleton/Skeleton";
import { FaMemory } from "react-icons/fa";
import { useAppSelector } from "../../hooks/redux";

export default function EnvironmentResource(): ReactElement {
  const { robotData } = useCreateRobot();
  const { applicationMode } = useAppSelector((state) => state.user);

  return (
    <div data-tut="robot-resources" className="flex flex-col items-end pb-2">
      <div className="flex items-center gap-3 pt-2">
        <span className="text-center text-xs font-semibold text-light-700">
          {applicationMode ? "Application" : "Robot"} Resources:
        </span>
        {[
          {
            icon: <BsFillCpuFill size={16} className="text-light-500" />,
            text: `${robotData.step1.resources.cpu?.allocatedCore}/${robotData.step1.tree.cloudInstance.resources.cpu?.coreTotal} Core CPU`,
          },
          {
            icon: <BsFillCpuFill size={16} className="text-light-500" />,
            text: `${robotData.step1.resources.gpu?.allocatedCore}/${robotData.step1.tree.cloudInstance.resources.gpu?.coreTotal} vGPU/MIG`,
          },
          {
            icon: <FaMemory size={16} className="text-light-500" />,
            text: `${robotData.step1.resources.memory?.allocatedCapacity}/${robotData.step1.tree.cloudInstance.resources.memory?.capacityTotal} GB Memory`,
          },
          {
            icon: <MdOutlineStorage size={16} className="text-light-500" />,
            text: `${robotData.step1.resources.storage?.allocatedCapacity}/${robotData.step1.tree.cloudInstance.resources.storage?.capacityTotal} GB Storage`,
          },
        ].map((item, index) => {
          return (
            <Fragment key={index}>
              {robotData.step1.tree.cloudInstance.resources.cpu?.coreTotal ? (
                <div
                  className="animate-fadeIn col-span-1 flex items-center gap-1.5"
                  key={index}
                >
                  {item.icon}
                  <span className="text-xs font-light">{item.text}</span>
                </div>
              ) : (
                <Skeleton className="min-h-4 min-w-28" />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
