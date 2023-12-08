import React, { ReactElement } from "react";
import WidgetLayout from "../../layouts/WidgetLayout";
import { VscHistory } from "react-icons/vsc";
import useRobot from "../../hooks/useRobot";

export default function AdrinActivitiesWidget(): ReactElement {
  const { adrinState } = useRobot();

  return (
    <WidgetLayout
      title={`Acitivities`}
      subtitle={`Last Activities`}
      icon={<VscHistory size={20} className="text-light-700" />}
    >
      <ul className="flex flex-col p-5 text-sm">
        {adrinState?.map((item: any, index: number) => {
          return (
            <li
              key={index}
              className="animate__animated animate__fadeIn grid grid-cols-12 gap-2"
            >
              <span className="col-span-1 text-xs font-medium">
                {item?.time}
              </span>
              <div className="col-span-2 justify-center">
                <div
                  className={`mx-auto flex h-4 w-4 items-center justify-center  rounded-full ${item?.color}`}
                >
                  <div className="bg-light-50 h-2 w-2 rounded-full " />
                </div>
                {adrinState?.length - 1 !== index && (
                  <div className="bg-light-200 mx-auto h-4 w-1"></div>
                )}
              </div>
              <span className="col-span-9 text-xs font-light">
                {item?.description}
              </span>
            </li>
          );
        })}
      </ul>
    </WidgetLayout>
  );
}
