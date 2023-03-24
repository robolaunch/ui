import React, { ReactElement } from "react";
import WidgetLayout from "../../layouts/WidgetLayout";
import { VscHistory } from "react-icons/vsc";

export default function ActivitiesWidget(): ReactElement {
  const data = [
    {
      time: "08:20",
      description: "Low Battery! %20",
    },
    {
      time: "08:20",
      description: "Completed Task #12",
    },
    {
      time: "08:20",
      description: "%50 Completed Task #12",
    },
    {
      time: "08:20",
      description: "Connected Joystick",
    },
    {
      time: "08:20",
      description: "Successful Deployment #XF-2356",
    },
    {
      time: "08:20",
      description: "Connected Depth Camera",
    },
    {
      time: "08:20",
      description: "Successful Deployment #XF-2356",
    },
    {
      time: "08:20",
      description: "Successful Deployment #XF-2356",
    },
    {
      time: "08:20",
      description: "Successful Deployment #XF-2356",
    },
    {
      time: "08:20",
      description: "Successful Deployment #XF-2356",
    },
    {
      time: "08:20",
      description: "Successful Deployment #XF-2356",
    },
    {
      time: "08:20",
      description: "Successful Deployment #XF-2356",
    },
    {
      time: "08:20",
      description: "Successful Deployment #XF-2356",
    },
    {
      time: "08:20",
      description: "Successful Deployment #XF-2356",
    },
    {
      time: "08:20",
      description: "Successful Deployment #XF-2356",
    },
  ];

  return (
    <WidgetLayout
      title={`Acitivities`}
      subtitle={`Last Activities`}
      icon={<VscHistory size={20} className="text-layer-light-700" />}
    >
      <ul className="flex flex-col p-5 text-sm">
        {data.map((item: any, index: number) => {
          return (
            <li key={index} className="grid grid-cols-12 gap-2">
              <span className="col-span-1 text-xs font-medium">
                {item?.time}
              </span>

              <div className="col-span-2 justify-center">
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-layer-primary-500 mx-auto">
                  <div className="w-2 h-2 rounded-full bg-layer-light-50 " />
                </div>
                <div className="w-1 h-6 bg-layer-light-200 mx-auto"></div>
              </div>

              <span className="col-span-9 text-xs font-light">
                {item.description}
              </span>
            </li>
          );
        })}
      </ul>
    </WidgetLayout>
  );
}
