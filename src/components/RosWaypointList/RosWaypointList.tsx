import RosWaypointListItem from "../RosWaypointListItem/RosWaypointListItem";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
} from "react-beautiful-dnd";

interface IRosWaypointList {
  setMissions: (value: any) => void;
  missions: any;
  activeMission: number;
  mission: any;
  missionIndex: number;
}

export default function RosWaypointList({
  setMissions,
  missions,
  activeMission,
  mission,
  missionIndex,
}: IRosWaypointList) {
  return (
    <DragDropContext
      onDragEnd={(result) => {
        setMissions((prev: any) => {
          const temp = [...prev];
          const [removed] = temp[activeMission].waypoints.splice(
            result.source.index,
            1,
          );
          temp[activeMission].waypoints.splice(
            result!.destination!.index,
            0,
            removed,
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
              minHeight: `${mission?.waypoints?.length * 7.5}rem`,
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {mission?.waypoints?.length !== 0 ? (
              mission?.waypoints?.map(
                (waypoint: any, waypointIndex: number) => {
                  return (
                    <Draggable
                      key={waypointIndex}
                      draggableId={`${waypointIndex}`}
                      index={waypointIndex}
                    >
                      {(provided: DraggableProvided, snapshot) => (
                        <div
                          key={waypointIndex}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <RosWaypointListItem
                            waypoint={waypoint}
                            waypointIndex={waypointIndex}
                            missionIndex={missionIndex}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                },
              )
            ) : (
              <div className="flex items-center justify-center pb-4 text-center text-xs text-gray-500">
                No Waypoints. If you want to add a waypoint, right click on the
                map.
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="flex items-center justify-center">
        <button
          onClick={() => {
            setMissions((prev: any) => {
              const temp = [...prev];
              temp.splice(activeMission, 1);
              return temp;
            });
          }}
          className="text-xs text-red-700"
          style={{
            fontSize: "0.65rem",
          }}
        >
          Delete Mission
        </button>
      </div>
    </DragDropContext>
  );
}
