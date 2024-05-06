import { handleGenerateRandomString } from "../functions/general.function";
import CFCancelButton from "../components/CFCancelButton/CFCancelButton";
import FormInputText from "../components/FormInputText/FormInputText";
import { ReactElement } from "react";
import Button from "../components/Button/Button";
import { Dialog } from "primereact/dialog";
import useTask from "../hooks/useTask";
import { useFormik } from "formik";
import { IJob } from "../interfaces/context/misssion.context.interface";
import RMTaskJobAddTasksMapper from "../components/RMTaskJobAddTasksMapper/RMTaskJobAddTasksMapper";

interface IRMTaskJobAddModal {
  handleCloseModal: () => void;
}

export default function RMTaskJobAddModal({
  handleCloseModal,
}: IRMTaskJobAddModal): ReactElement {
  const { handleReload } = useTask();

  const formik = useFormik<IJob>({
    initialValues: {
      jobID: handleGenerateRandomString(16),
      robotUrl: "",
      priority: 0,
      jobStatus: "NULL",
      deadline: "15:00:00",
      taskList: [
        {
          LocationId: undefined,
          ActionName: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log(values);

      handleReload();

      handleCloseModal();
    },
  });

  return (
    <Dialog
      header="Add Job"
      visible={true}
      className="flex h-fit w-[40vw] "
      onHide={handleCloseModal}
      draggable={false}
    >
      <form className="flex flex-col gap-10 p-2" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Job Information</label>
            <p className="text-sm font-medium">Enter the details of the job</p>
          </div>
          <div className="flex gap-4">
            <FormInputText
              type="number"
              labelName="Priority:"
              labelInfoTip="Priority of the job"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("priority")}
            />
            <FormInputText
              labelName="Deadline:"
              labelInfoTip="Deadline of the job"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("deadline")}
            />
          </div>
        </div>
        <div className="wh-full flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Job Task Locations</label>
            <p className="text-sm font-medium">
              Enter the locations of the tasks in the job
            </p>
          </div>
          <RMTaskJobAddTasksMapper formik={formik} />
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
            text="Add Job"
          />
        </div>
      </form>
    </Dialog>
  );
}
