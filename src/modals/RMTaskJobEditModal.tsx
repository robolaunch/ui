import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";
import { IJob } from "../interfaces/task-management.interface";
import { useFormik } from "formik";
import FormInputText from "../components/FormInputText/FormInputText";
import CFCancelButton from "../components/CFCancelButton/CFCancelButton";
import Button from "../components/Button/Button";
import useTaskManagement from "../hooks/useTaskManagement";

interface IRMTaskJobEditModal {
  handleCloseModal: () => void;
}

export default function RMTaskJobEditModal({
  handleCloseModal,
}: IRMTaskJobEditModal): ReactElement {
  const { jobs, activeJob, handleUpdateJob } = useTaskManagement();

  const formik = useFormik<IJob>({
    initialValues: jobs[activeJob!] as IJob,
    onSubmit: async (newJob) => {
      await handleUpdateJob(newJob);
      await handleCloseModal();
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
