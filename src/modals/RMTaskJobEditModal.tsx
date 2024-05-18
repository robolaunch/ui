import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";
import { IJob, IWaypoint } from "../interfaces/task-management.interface";
import { useFormik } from "formik";
import FormInputText from "../components/FormInputText/FormInputText";
import CFCancelButton from "../components/CFCancelButton/CFCancelButton";
import Button from "../components/Button/Button";
import useTaskManagement from "../hooks/useTaskManagement";
import RMTaskWaypointCardV2 from "../components/RMTaskWaypointCardV2/RMTaskWaypointCardV2";
import { BsPlusCircle } from "react-icons/bs";
import { Tooltip } from "@nextui-org/react";
import { useAppDispatch } from "../hooks/redux";
import { updateJob } from "../toolkit/JobSlice";

interface IRMTaskJobEditModal {
  job: IJob;
  handleCloseModal: () => void;
}

export default function RMTaskJobEditModal({
  job,
  handleCloseModal,
}: IRMTaskJobEditModal): ReactElement {
  const { waypoints, reloadJobs } = useTaskManagement();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: job,
    onSubmit: async (newJob) => {
      await dispatch(
        updateJob({
          ...newJob,
          // @ts-ignore
          waypoints: JSON.stringify(newJob.waypoints),
        }),
      );

      await reloadJobs();
      handleCloseModal();
    },
  });

  return (
    <Dialog
      header="Edit Job"
      visible={true}
      className="flex h-fit w-[40vw] "
      onHide={handleCloseModal}
      draggable={false}
    >
      <form className="flex flex-col gap-10 p-2" onSubmit={formik.handleSubmit}>
        <FormInputText
          type="text"
          labelName="Job Name:"
          labelInfoTip="Job Name"
          classNameContainer="flex gap-4 items-center"
          classNameInput="!p-0"
          disabled={formik.isSubmitting}
          inputProps={formik.getFieldProps("job_name")}
          inputError={formik.errors.job_name}
          inputTouched={formik.touched.job_name}
        />
        <div className="flex h-96 flex-col gap-4 overflow-auto rounded border border-primary-100 p-4">
          {formik?.values?.waypoints?.map((newWaypoint, index) => {
            return (
              <RMTaskWaypointCardV2
                key={index}
                disabledButtons
                enabledRemoveButtonForJob
                waypoint={
                  (waypoints.find(
                    (contextW) => contextW.waypoint_id === newWaypoint,
                  ) as IWaypoint) || ({} as IWaypoint)
                }
                onClickRemoveButtonForJob={() => {
                  formik.setFieldValue(
                    "waypoints",
                    formik.values.waypoints.filter(
                      (waypoint, i) => i !== index,
                    ),
                  );
                }}
              />
            );
          })}
          <Tooltip
            content={
              <div className="flex h-96 w-96 flex-col gap-4 overflow-auto rounded border border-primary-100 bg-white p-4 shadow">
                {waypoints?.map((waypoint, index) => {
                  return (
                    <RMTaskWaypointCardV2
                      enabledAddButtonForJob
                      onClickAddButtonForJob={() => {
                        formik.setFieldValue("waypoints", [
                          ...formik.values.waypoints,
                          waypoint?.waypoint_id,
                        ]);
                      }}
                      disabledButtons
                      waypoint={waypoint}
                      key={index}
                    />
                  );
                })}
              </div>
            }
          >
            <div className="mx-auto h-fit w-fit">
              <BsPlusCircle
                size={18}
                className={`mx-auto cursor-pointer text-primary-500 duration-500 hover:scale-90 hover:text-primary-700`}
              />
            </div>
          </Tooltip>
        </div>

        <div className="mt-4 flex gap-2">
          <CFCancelButton
            disabled={formik.isSubmitting}
            onClick={handleCloseModal}
          />
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            className="!h-11 text-xs"
            loading={formik.isSubmitting}
            text="Update Job"
          />
        </div>
      </form>
    </Dialog>
  );
}
