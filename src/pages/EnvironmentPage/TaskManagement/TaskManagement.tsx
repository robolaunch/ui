import { ReactElement } from "react";
import MissionContext from "../../../contexts/MissionContext";
import BarcodeContext from "../../../contexts/BarcodeContext";
import TaskManagementLayout from "../../../layouts/TaskManagementLayout";

export default function TaskManagement(): ReactElement {
  return (
    <MissionContext>
      <BarcodeContext>
        <TaskManagementLayout />
      </BarcodeContext>
    </MissionContext>
  );
}
