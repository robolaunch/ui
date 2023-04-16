import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import RosWaypointListItem from "../RosWaypointListItem/RosWaypointListItem";

interface IRosWaypointList {
  setMissions: (value: any) => void;
  missions: any;
  activeMission: number;
  mission: any;
}

export default function RosWaypointList({
  setMissions,
  missions,
  activeMission,
  mission,
}: IRosWaypointList) {
  return (
    <DragDropContext
      onDragEnd={(result) => {
        setMissions((prev: any) => {
          const temp = [...prev];
          const [removed] = temp[activeMission].waypoints.splice(
            result.source.index,
            1
          );
          temp[activeMission].waypoints.splice(
            result!.destination!.index,
            0,
            removed
          );
          return temp;
        });
      }}
    >
      <Droppable droppableId={`${activeMission}`}>
        {(provided, snapshot) => (
          <div
            className="flex flex-col gap-3"
            style={{
              minHeight: `${mission?.waypoints?.length * 3.75}rem`,
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {mission?.waypoints?.map((waypoint: any, waypointIndex: number) => {
              return (
                <Draggable
                  key={waypointIndex}
                  draggableId={`${waypointIndex}`}
                  index={waypointIndex}
                >
                  {(provided, snapshot) => (
                    <div
                      key={waypointIndex}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <RosWaypointListItem
                        waypoint={waypoint}
                        waypointIndex={waypointIndex}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
