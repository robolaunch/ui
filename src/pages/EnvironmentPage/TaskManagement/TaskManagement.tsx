import { ReactElement } from "react";
import MissionContext from "../../../contexts/MissionContext";
import BarcodeContext from "../../../contexts/BarcodeContext";
import TaskManagementLayout from "../../../layouts/TaskManagementLayout";
import TaskContext from "../../../contexts/TaskContext";

export default function TaskManagement(): ReactElement {
  return (
    <MissionContext>
      <BarcodeContext>
        <TaskContext>
          <TaskManagementLayout />
        </TaskContext>
      </BarcodeContext>
    </MissionContext>
  );
}
