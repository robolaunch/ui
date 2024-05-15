import { ReactElement } from "react";
import MissionContext from "../../../contexts/MissionContext";
import BarcodeContext from "../../../contexts/BarcodeContext";
import TaskManagementLayout from "../../../layouts/TaskManagementLayout";
import TaskContext from "../../../contexts/TaskContext";
import LogContext from "../../../contexts/LogContext";
import RosContext from "../../../contexts/RosContext";

export default function TaskManagement(): ReactElement {
  return (
    <MissionContext>
      <BarcodeContext>
        <RosContext>
          <LogContext>
            <TaskContext>
              <TaskManagementLayout />
            </TaskContext>
          </LogContext>
        </RosContext>
      </BarcodeContext>
    </MissionContext>
  );
}
