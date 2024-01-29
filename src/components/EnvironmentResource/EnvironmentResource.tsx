import { MdOutlineStorage } from "react-icons/md";
import { Fragment, ReactElement } from "react";
import { BsFillCpuFill } from "react-icons/bs";
import Skeleton from "../Skeleton/Skeleton";
import { FaMemory } from "react-icons/fa";
import { useAppSelector } from "../../hooks/redux";
import useMain from "../../hooks/useMain";

export default function EnvironmentResource(): ReactElement {
  const { applicationMode } = useAppSelector((state) => state.user);

  const { selectedState } = useMain();

  return (
    <div data-tut="robot-resources" className="flex flex-col items-end pb-2">
      <div className="flex items-center gap-3 pt-2">
        <span className="text-center text-xs font-semibold text-light-700">
          {applicationMode ? "Application" : "Robot"} Resources:
        </span>
        {[
          {
            icon: <BsFillCpuFill size={16} className="text-light-500" />,
            text: `${selectedState?.instance?.resources?.hardware?.cpu?.totalCore} Core CPU`,
          },
          {
            icon: <BsFillCpuFill size={16} className="text-light-500" />,
            text: `${""} vGPU/MIG`,
          },
          {
            icon: <FaMemory size={16} className="text-light-500" />,
            text: `${selectedState?.instance?.resources?.hardware?.memory?.totalGB} GB Memory`,
          },
          {
            icon: <MdOutlineStorage size={16} className="text-light-500" />,
            text: `${selectedState?.instance?.resources?.hardware?.storage?.totalGB} GB Storage`,
          },
        ].map((item, index) => {
          return (
            <Fragment key={index}>
              {selectedState?.instance?.resources?.hardware?.cpu?.totalCore ? (
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
