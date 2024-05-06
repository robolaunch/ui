import { Fragment, ReactElement } from "react";
import { IJob } from "../../interfaces/context/misssion.context.interface";
import { FormikProps } from "formik";
import FormInputText from "../FormInputText/FormInputText";
import Card from "../Card/Card";
import CFAddButton from "../CFAddButton/CFAddButton";
import FormInputSelect from "../FormInputSelect/FormInputSelect";
import useTask from "../../hooks/useTask";
import CFDellButton from "../CFDellButton/CFDellButton";

interface IRMTaskJobAddTasksMapper {
  formik: FormikProps<IJob>;
}

export default function RMTaskJobAddTasksMapper({
  formik,
}: IRMTaskJobAddTasksMapper): ReactElement {
  const { missionReducer } = useTask();

  return (
    <div className="flex h-full max-h-96 flex-col gap-4 overflow-auto">
      {formik.values.taskList.map((_, index) => {
        return (
          <Card
            className="flex flex-col items-center gap-4 p-4 shadow-none"
            key={index}
          >
            <p className="text-sm font-semibold text-dark-600">
              Location #{index + 1}
            </p>
            <div className="flex !h-fit w-full gap-4 ">
              <FormInputSelect
                tip="Location ID of the job"
                inputError={false}
                inputTouched
                labelName="Location ID:"
                inputProps={formik.getFieldProps(
                  `taskList.${index}.LocationId`,
                )}
                options={
                  <Fragment>
                    {!formik.values.taskList[index].LocationId && (
                      <option selected value={undefined} disabled>
                        Select a waypoint
                      </option>
                    )}
                    {missionReducer?.waypoints?.map((waypoint, index) => {
                      return (
                        <option key={index} value={waypoint.locationID}>
                          {waypoint.locationID}
                        </option>
                      );
                    })}
                  </Fragment>
                }
              />
              <FormInputText
                type="text"
                labelName="Action Name:"
                labelInfoTip="Action name of the job"
                disabled={formik.isSubmitting}
                inputProps={formik.getFieldProps(
                  `taskList.${index}.ActionName`,
                )}
              />
            </div>
            <p
              onClick={() =>
                formik.setFieldValue(
                  "taskList",
                  formik.values.taskList.filter((_, i) => i !== index),
                )
              }
              className="w-fit cursor-pointer text-xs text-red-500 underline hover:text-red-700"
            >
              Delete Task
            </p>
          </Card>
        );
      })}
      <div>
        <CFAddButton
          onClick={() => {
            formik.setFieldValue("taskList", [
              ...formik.values.taskList,
              {
                LocationId: undefined,
                ActionName: "",
              },
            ]);
          }}
        />
      </div>
    </div>
  );
}
