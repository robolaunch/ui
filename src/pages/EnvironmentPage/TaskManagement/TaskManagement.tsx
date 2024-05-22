import { ReactElement } from "react";
import BarcodeContext from "../../../contexts/BarcodeContext";
import TaskManagementLayout from "../../../layouts/TaskManagementLayout";
import LogContext from "../../../contexts/LogContext";
import RosContext from "../../../contexts/RosContext";
import TaskManagementContext from "../../../contexts/TaskManagementContext";

export default function TaskManagement(): ReactElement {
  return (
    <TaskManagementContext>
      <BarcodeContext>
        <RosContext>
          <LogContext>
            <TaskManagementLayout />
          </LogContext>
        </RosContext>
      </BarcodeContext>
    </TaskManagementContext>
  );
}
