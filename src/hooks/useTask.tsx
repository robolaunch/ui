import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { IuseTask } from "../interfaces/hook/task.hook.interface";

const useTask = () => {
  const useTask: IuseTask = useContext(TaskContext);

  return useTask;
};

export default useTask;
