import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";
import { FormikProps, useFormik } from "formik";
import { IJob } from "../interfaces/context/misssion.context.interface";
import CFSection from "../components/CFSection/CFSection";
import FormInputText from "../components/FormInputText/FormInputText";
import Button from "../components/Button/Button";
import WaypointsMapperJobModal from "../components/waypoint.mapper/waypoint.mapper.job.modal";

interface IAddJobModal {
  header: string;
  initialValues?: any;
  handleCloseModal: () => void;
}

export default function AddJobModal({
  header,
  initialValues,
  handleCloseModal,
}: IAddJobModal): ReactElement {
  const formik: FormikProps<IJob> = useFormik<IJob>({
    initialValues: {
      jobID: "",
      jobStatus: "",
      deadline: "",
      priority: 0,
      robotUrl: "",
      taskList: [],
    },
    onSubmit: () => {},
  });

  return (
    <Dialog
      header={header}
      visible={true}
      className="h-full w-[60vw]"
      onHide={() => handleCloseModal()}
    >
      <form
        onSubmit={formik?.handleSubmit}
        className="animate-fadeIn relative flex h-full w-full flex-col gap-4"
      >
        <CFSection>
          <FormInputText
            labelName="Job ID:"
            inputProps={{
              ...formik.getFieldProps("jobID"),
            }}
            labelInfoTip="Unique identifier for the job"
          />
        </CFSection>
        <CFSection>
          <FormInputText
            labelName="Deadline:"
            inputProps={{
              ...formik.getFieldProps("deadline"),
            }}
            labelInfoTip="Deadline for the job"
          />
        </CFSection>
        <CFSection>
          <FormInputText
            labelName="Priority:"
            inputProps={{
              ...formik.getFieldProps("priority"),
            }}
            labelInfoTip="Priority of the job"
          />
        </CFSection>

        <WaypointsMapperJobModal formik={formik} />

        <Button type="submit" text={"Add Job"} />
      </form>
    </Dialog>
  );
}
