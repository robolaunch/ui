import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../../../layouts/CardLayout";
import Accordion from "../../../../components/Accordion/Accordion";
import InputToggle from "../../../../components/InputToggle/InputToggle";
import { RxDotsVertical } from "react-icons/rx";
import { BsPinMap } from "react-icons/bs";
import { CgTrashEmpty } from "react-icons/cg";
import useMouse from "@react-hook/mouse-position";
import { useImageSize } from "react-image-size";

export default function TaskManagement(): ReactElement {
  const missions = [
    {
      name: "Mission 1 (Surveillance)",
      active: true,
      waypoints: [
        {
          name: "Waypoint 1",
          coordinates: "39.90, 27,23",
          icon: <BsPinMap size={24} />,
        },
        {
          name: "Waypoint 2",
          coordinates: "39.90, 27,23",
          icon: <BsPinMap size={24} />,
        },
        {
          name: "Waypoint 3",
          coordinates: "39.90, 27,23",
          icon: <BsPinMap size={24} />,
        },
        {
          name: "Waypoint 4",
          coordinates: "39.90, 27,23",
          icon: <BsPinMap size={24} />,
        },
      ],
    },
    {
      name: "Mission 2 (Site Inspection)",
      active: true,
      waypoints: [],
    },
    {
      name: "Mission 3 (Hospitalty)",
      active: false,
      waypoints: [],
    },
    {
      name: "Mission 4 (Indoor Delivery)",
      active: true,
      waypoints: [],
    },
  ];

  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  const img: any = useImageSize(`/images/abstract3-white.jpg`);

  return (
    <div className="grid grid-cols-12 gap-6 h-[42rem]">
      <CardLayout className="col-span-3 !p-4">
        <div className="flex flex-col gap-2">
          {missions.map((mission: any, index: number) => {
            return (
              <Accordion
                header={
                  <div className="w-full flex items-center justify-between">
                    <span className="text-sm font-medium text-layer-dark-500">
                      {mission?.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <InputToggle
                        icons={false}
                        checked={mission?.active}
                        onChange={() => {}}
                      />
                      <RxDotsVertical />
                    </div>
                  </div>
                }
              >
                <div className="flex flex-col gap-3">
                  {mission?.waypoints?.map((waypoint: any, index: number) => {
                    return (
                      <div className="flex justify-between items-center p-2 border border-layer-light-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center p-2">
                            {waypoint?.icon}
                          </div>
                          <div className="flex flex-col text-sm font-medium gap-1">
                            <span>{waypoint?.name}</span>
                            <span className="text-xs font-light">
                              {waypoint?.coordinates}
                            </span>
                          </div>
                        </div>
                        <CgTrashEmpty size={24} />
                      </div>
                    );
                  })}
                </div>
              </Accordion>
            );
          })}
        </div>
        img: {img[0]?.width} x {img[0]?.height}
        <br />
        x: {mouse.x}
        <br />
        y: {mouse.y}
      </CardLayout>

      <CardLayout className="col-span-9">
        <Fragment>
          <div className="relative h-full w-full">
            <img
              ref={ref}
              onMouseDown={(e: any) => console.log(e, e.clientX, e.clientY)}
              className="absolute inset-0"
              src="/images/abstract3-white.jpg"
              alt="robolaunch"
            />
          </div>
        </Fragment>
      </CardLayout>
    </div>
  );
}
