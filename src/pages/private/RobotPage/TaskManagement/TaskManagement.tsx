import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CardLayout from "../../../../layouts/CardLayout";
import Accordion from "../../../../components/Accordion/Accordion";
import InputToggle from "../../../../components/InputToggle/InputToggle";
import { RxDotsVertical } from "react-icons/rx";
import { BsPinMap, BsCameraVideo, BsPlusCircle } from "react-icons/bs";
import { CgTrashEmpty } from "react-icons/cg";
import useMouse from "@react-hook/mouse-position";
import { ContextMenu } from "@ni7r0g3n/react-context-menu";
import { AiOutlinePauseCircle } from "react-icons/ai";

export default function TaskManagement(): ReactElement {
  const [tempCordinates, setTempCordinates] = useState<any>({ x: 0, y: 0 });
  const [activeMission, setActiveMission] = useState<number>();
  const [missions, setMissions] = useState<any>([
    {
      name: "Mission 1 (Surveillance)",
      active: true,
      waypoints: [
        {
          name: "Waypoint 1",
          type: "go",
          coordinates: "39.90, 27,23",
          icon: <BsPinMap size={24} />,
        },
      ],
    },
  ]);

  const ref = React.useRef<any>(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  function handleaddWaypointToMission(type: string) {
    if (activeMission !== -1) {
      setMissions((prev: any) => {
        let temp = [...prev];
        temp[activeMission!].waypoints.push({
          name: "Waypoint " + Number(temp[activeMission!].waypoints.length + 1),
          type: type,
          coordinates: `${tempCordinates?.x}, ${tempCordinates?.y}`,
          icon: handleMissionIcon(type),
        });

        return temp;
      });
    }
  }

  const items = [
    {
      label: (
        <div className="w-full h-full flex items-center gap-2 hover:scale-90 transition-all duration-500">
          <BsPinMap size={20} />
          <span>Go to waypoint </span>
        </div>
      ),
      onClick: () => handleaddWaypointToMission("go"),
    },
    {
      label: (
        <div className="w-full h-full flex items-center gap-2 hover:scale-90 transition-all duration-500">
          <AiOutlinePauseCircle size={20} />
          <span>Go to waypoint and wait</span>
        </div>
      ),

      onClick: () => handleaddWaypointToMission("go_wait"),
    },
    {
      label: (
        <div className="w-full h-full flex items-center gap-2 hover:scale-90 transition-all duration-500">
          <BsCameraVideo size={20} />
          <span>Go to waypoint </span>
        </div>
      ),
      onClick: () => handleaddWaypointToMission("go_takePicture"),
    },
  ];

  function handleMissionIcon(type: string) {
    switch (type) {
      case "go":
        return <BsPinMap size={24} />;
      case "go_wait":
        return <AiOutlinePauseCircle size={24} />;
      case "go_takePicture":
        return <BsCameraVideo size={24} />;
    }
  }

  return (
    <div className="grid grid-cols-12 gap-6 h-[42rem]">
      <CardLayout className="col-span-3 !p-4">
        <Fragment>
          <div className="flex flex-col gap-2">
            {missions.map((mission: any, index: number) => {
              return (
                <Accordion
                  setActiveMission={setActiveMission}
                  id={index}
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
          <div className="w-full flex items-center justify-center p-8">
            <button
              className="hover:scale-90 transition-all duration-500"
              onClick={() => {
                setMissions((prev: any) => {
                  return [
                    ...prev,
                    {
                      name: "Mission " + Number(prev?.length + 1),
                      active: true,
                      waypoints: [],
                    },
                  ];
                });
              }}
            >
              <BsPlusCircle size={24} />
            </button>
          </div>
          <div className="flex gap-4">
            <span>
              img: {ref?.current?.naturalWidth} x {ref?.current?.naturalHeight}
            </span>
            <span>x: {mouse.x}</span>
            <span>y: {mouse.y}</span>{" "}
            <span>rendered img x: {ref?.current?.offsetWidth}</span>
            <span>rendered img y: {ref?.current?.offsetHeight}</span>
            <span>
              real x:{" "}
              {(ref?.current?.naturalWidth / ref?.current?.offsetWidth) *
                mouse.x!}
            </span>
            <span>
              real y:{" "}
              {(ref?.current?.naturalHeight / ref?.current?.offsetHeight) *
                mouse.y!}
            </span>
          </div>
        </Fragment>
      </CardLayout>
      <CardLayout className="col-span-9">
        <ContextMenu
          onOpen={() =>
            setTempCordinates({
              x:
                (ref?.current?.naturalWidth / ref?.current?.offsetWidth) *
                mouse.x!,
              y:
                (ref?.current?.naturalHeight / ref?.current?.offsetHeight) *
                mouse.y!,
            })
          }
          adaptive={true}
          setController={(controller: any) => {
            console.log(controller);
          }}
          items={activeMission !== -1 ? items : []}
        >
          <div className="relative h-full w-full">
            <img
              ref={ref}
              className="absolute inset-0"
              src="/images/abstract3-white.jpg"
              alt="robolaunch"
            />
          </div>
        </ContextMenu>
      </CardLayout>
    </div>
  );
}
