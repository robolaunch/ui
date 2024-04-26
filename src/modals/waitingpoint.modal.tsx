import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";
import { FormikProps, useFormik } from "formik";
import CFSection from "../components/CFSection/CFSection";
import FormInputText from "../components/FormInputText/FormInputText";
import Button from "../components/Button/Button";
import { IWaypoint } from "../interfaces/context/misssion.context.interface";
import useTask from "../hooks/useTask";

interface IAddWaitingModal {
  ros: any;
  header: string;
  initialValues?: any;
  handleCloseModal: () => void;
}

export default function AddWaitingModal({
  ros,
  header,
  initialValues,
  handleCloseModal,
}: IAddWaitingModal): ReactElement {
  const { handleCreateWaitingPoint, handleUpdateWaitingPoint } = useTask();

  const formik: FormikProps<IWaypoint> = useFormik<IWaypoint>({
    initialValues: initialValues || {
      locationID: "",
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      orientation: {
        x: 0,
        y: 0,
        z: 0,
        w: 0,
      },
      locationStatus: "",
    },
    onSubmit: (values) => {
      console.log(values);
      initialValues
        ? handleUpdateWaitingPoint(values)
        : handleCreateWaitingPoint(values);
      handleCloseModal();
    },
  });

  return (
    <Dialog
      header={header}
      visible={true}
      className=" w-[60vw]"
      onHide={() => handleCloseModal()}
    >
      <form
        onSubmit={formik?.handleSubmit}
        className="animate-fadeIn relative flex h-full w-full flex-col gap-4"
      >
        <CFSection>
          <FormInputText
            labelName="Location ID:"
            inputProps={{
              ...formik.getFieldProps("locationID"),
            }}
            labelInfoTip="Unique identifier for the location"
          />
        </CFSection>

        <div className="flex w-full gap-4">
          <CFSection>
            <FormInputText
              labelInfoTip="Position of the location"
              labelName="Position X:"
              inputProps={{
                ...formik.getFieldProps("position.x"),
              }}
            />
          </CFSection>
          <CFSection>
            <FormInputText
              labelInfoTip="Position of the location"
              labelName="Position Y:"
              inputProps={{
                ...formik.getFieldProps("position.y"),
              }}
            />
          </CFSection>
          <CFSection>
            <FormInputText
              labelInfoTip="Position of the location"
              labelName="Position Z:"
              inputProps={{
                ...formik.getFieldProps("position.z"),
              }}
            />
          </CFSection>
        </div>

        <div className="flex w-full gap-4">
          <CFSection>
            <FormInputText
              labelInfoTip="Orientation of the location"
              labelName="Orientation X:"
              inputProps={{
                ...formik.getFieldProps("orientation.x"),
              }}
            />
          </CFSection>
          <CFSection>
            <FormInputText
              labelInfoTip="Orientation of the location"
              labelName="Orientation Y:"
              inputProps={{
                ...formik.getFieldProps("orientation.y"),
              }}
            />
          </CFSection>
          <CFSection>
            <FormInputText
              labelInfoTip="Orientation of the location"
              labelName="Orientation Z:"
              inputProps={{
                ...formik.getFieldProps("orientation.z"),
              }}
            />
          </CFSection>
          <CFSection>
            <FormInputText
              labelInfoTip="Orientation of the location"
              labelName="Orientation W:"
              inputProps={{
                ...formik.getFieldProps("orientation.w"),
              }}
            />
          </CFSection>
        </div>
        <Button type="submit" text={header} />
      </form>
    </Dialog>
  );
}
