import { handleGenerateRandomString } from "../functions/general.function";
import CFCancelButton from "../components/CFCancelButton/CFCancelButton";
import FormInputText from "../components/FormInputText/FormInputText";
import { Fragment, ReactElement } from "react";
import Button from "../components/Button/Button";
import { Dialog } from "primereact/dialog";
import useTask from "../hooks/useTask";
import { useFormik } from "formik";

interface IRMTaskWaypointAddModal {
  handleCloseModal: () => void;
  type: "waypoints" | "waitingPoints";
}

export default function RMTaskWaypointAddModal({
  handleCloseModal,
  type,
}: IRMTaskWaypointAddModal): ReactElement {
  //
  //

  const { handleCreateLocation, handleCreateWaitingPoint, handleReload } =
    useTask();

  const formik = useFormik({
    initialValues: {
      id: handleGenerateRandomString(16),
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
      status: "CONNECTED",
    },
    onSubmit: (values) => {
      console.log(values);

      if (type === "waypoints") {
        handleCreateLocation({
          locationID: values.id,
          position: {
            x: values.position.x,
            y: values.position.y,
            z: values.position.z,
          },
          orientation: {
            x: values.orientation.x,
            y: values.orientation.y,
            z: values.orientation.z,
            w: values.orientation.w,
          },
          locationStatus: values.status,
        });
      } else {
        handleCreateWaitingPoint({
          waitingPointID: values.id,
          position: {
            x: values.position.x,
            y: values.position.y,
            z: values.position.z,
          },
          orientation: {
            x: values.orientation.x,
            y: values.orientation.y,
            z: values.orientation.z,
            w: values.orientation.w,
          },
          waitingPointStatus: values.status,
        });
      }

      handleReload();

      handleCloseModal();
    },
  });

  const header = (type: "position" | "orientation") => (
    <Fragment>
      <label className="text-sm font-semibold">
        Waypoint {type === "position" ? "Position" : "Orientation"}
      </label>
      <p className="text-sm font-medium">
        Enter the position of the{" "}
        {type === "position" ? "waypoint" : "orientation"}
      </p>
    </Fragment>
  );

  return (
    <Dialog
      header={type === "waypoints" ? "Add Waypoint" : "Add Waiting Point"}
      visible={true}
      className="flex h-fit w-[40vw] "
      onHide={handleCloseModal}
      draggable={false}
    >
      <form className="flex flex-col gap-10 p-2" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          {header("position")}
          <div className="flex gap-4">
            <FormInputText
              type="number"
              labelName="X:"
              labelInfoTip="X coordinate of the waypoint"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("position.x")}
              inputError={formik.errors.position?.x}
              inputTouched={formik.touched.position?.x}
            />
            <FormInputText
              type="number"
              labelName="Y:"
              labelInfoTip="Y coordinate of the waypoint"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("position.y")}
              inputError={formik.errors.position?.y}
              inputTouched={formik.touched.position?.y}
            />
            <FormInputText
              type="number"
              labelName="Z:"
              labelInfoTip="Z coordinate of the waypoint"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("position.z")}
              inputError={formik.errors.position?.z}
              inputTouched={formik.touched.position?.z}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {header("orientation")}
          <div className="flex gap-4">
            <FormInputText
              type="number"
              labelName="X:"
              labelInfoTip="X coordinate of the waypoint"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("orientation.x")}
              inputError={formik.errors.orientation?.x}
              inputTouched={formik.touched.orientation?.x}
            />
            <FormInputText
              type="number"
              labelName="Y:"
              labelInfoTip="Y coordinate of the waypoint"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("orientation.y")}
              inputError={formik.errors.orientation?.y}
              inputTouched={formik.touched.orientation?.y}
            />
            <FormInputText
              type="number"
              labelName="Z:"
              labelInfoTip="Z coordinate of the waypoint"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("orientation.z")}
              inputError={formik.errors.orientation?.z}
              inputTouched={formik.touched.orientation?.z}
            />
            <FormInputText
              type="number"
              labelName="W:"
              labelInfoTip="W coordinate of the waypoint"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("orientation.w")}
              inputError={formik.errors.orientation?.w}
              inputTouched={formik.touched.orientation?.w}
            />
          </div>
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
            text={type === "waypoints" ? "Add Waypoint" : "Add Waiting Point"}
          />
        </div>
      </form>
    </Dialog>
  );
}
