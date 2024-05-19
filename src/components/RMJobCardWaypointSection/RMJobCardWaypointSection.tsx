import { ReactElement, useEffect, useState } from "react";
import { IJob } from "../../interfaces/task-management.interface";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";
import useTaskManagement from "../../hooks/useTaskManagement";
import RMJobCardWaypointSectionButton from "../RMJobCardWaypointSectionButton/RMJobCardWaypointSectionButton";

interface IRMJobCardWaypointSection {
  job: IJob;
}

interface Waypoint {
  position: {
    x: number;
    y: number;
    z: number;
  };
  orientation: {
    x: number;
    y: number;
    z: number;
    w: number;
  };
  uniqueId: string;
}

export default function RMJobCardWaypointSection({
  job,
}: IRMJobCardWaypointSection): ReactElement {
  const { handleUpdateJob } = useTaskManagement();

  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

  useEffect(() => {
    const waypointsWithIds = (job.waypoints || []).map((waypoint) => ({
      ...waypoint,
      uniqueId: uuidv4(),
    }));
    setWaypoints(waypointsWithIds);
  }, [job.waypoints]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const oldIndex = waypoints.findIndex((w) => w.uniqueId === active.id);
    const newIndex = waypoints.findIndex((w) => w.uniqueId === over.id);

    setWaypoints((w) => {
      const updatedWaypoints = [...w];
      const [movedWaypoint] = updatedWaypoints.splice(oldIndex, 1);
      updatedWaypoints.splice(newIndex, 0, movedWaypoint);

      handleUpdateJob({
        ...job,
        waypoints: updatedWaypoints.map((waypoint) => ({
          position: waypoint.position,
          orientation: waypoint.orientation,
        })),
      });

      return updatedWaypoints;
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={waypoints.map((waypoint) => waypoint.uniqueId)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex w-full flex-col gap-2">
          {waypoints.map((waypoint, index) => (
            <SortableItem
              key={waypoint.uniqueId}
              id={waypoint.uniqueId}
              index={index}
              waypoint={waypoint}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({
  id,
  index,
  waypoint,
}: {
  id: string;
  index: number;
  waypoint: Waypoint;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex !h-fit w-full items-center justify-between rounded border bg-white p-4 text-xs shadow-sm"
    >
      <div className="flex flex-col gap-2">
        <label className="flex gap-1">
          <span className="font-semibold text-dark-800">Waypoint Index:</span>
          <span className="text-dark-700">{index + 1}</span>
        </label>
        <label className="flex gap-1">
          <span className="font-semibold text-dark-800">Position:</span>
          <span className="text-dark-700">
            {`X: ${waypoint.position.x.toFixed(2)} | Y: ${waypoint.position.y.toFixed(2)} | Z: ${waypoint.position.z.toFixed(2)}`}
          </span>
        </label>
        <label className="flex gap-1">
          <span className="font-semibold text-dark-800">Orientation:</span>
          <span className="text-dark-700">
            {`X: ${waypoint.orientation.x.toFixed(1)} | Y: ${waypoint.orientation.y.toFixed(1)} | Z: ${waypoint.orientation.z.toFixed(1)} | W: ${waypoint.orientation.w.toFixed(1)}`}
          </span>
        </label>
      </div>
      <RMJobCardWaypointSectionButton index={index} />
    </div>
  );
}
