import { Fragment, ReactElement } from "react";
import useTask from "../../hooks/useTask";
import { FormikProps } from "formik";
import { IJob } from "../../interfaces/context/misssion.context.interface";
import InputSelect from "../InputSelect/InputSelect";
import FormInputText from "../FormInputText/FormInputText";
import CardLayout from "../../layouts/CardLayout";
import { BsPlusCircle } from "react-icons/bs";

interface IWaypointMapperJobModal {
  formik: FormikProps<IJob>;
}

export default function WaypointsMapperJobModal({
  formik,
}: IWaypointMapperJobModal): ReactElement {
  const { missionReducer } = useTask();

  return (
    <div className="flex w-full flex-col gap-2">
      {formik.values.taskList?.map((task, index) => {
        return (
          <CardLayout>
            <div key={index} className="flex flex-col items-center gap-2">
              <InputSelect>
                <Fragment>
                  <option value="">Select Job</option>
                  {missionReducer.jobs?.map((job, index) => {
                    return (
                      <option key={index} value={job.jobID}>
                        {job.jobID}
                      </option>
                    );
                  })}
                </Fragment>
              </InputSelect>

              <FormInputText
                labelName="Action Name:"
                inputProps={{
                  ...formik.getFieldProps(`taskList.${index}.ActionName`),
                }}
                labelInfoTip="Name of the action"
              />
            </div>
            <span
              className="cursor-pointer text-xs text-red-500"
              onClick={() => {
                formik.setFieldValue(
                  "taskList",
                  formik.values.taskList.filter((_, i) => i !== index),
                );
              }}
            >
              Delete Waypoint
            </span>
          </CardLayout>
        );
      })}
      <BsPlusCircle
        className="mx-auto mt-4 cursor-pointer text-primary-600 transition-all duration-300 hover:scale-90"
        size={20}
        onClick={() => {
          formik.setFieldValue("taskList", [
            ...formik.values.taskList,
            {
              ActionName: "",
              JobID: "",
            },
          ]);
        }}
      />
    </div>
  );
}
