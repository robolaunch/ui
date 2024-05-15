import CFCancelButton from "../components/CFCancelButton/CFCancelButton";
import FormInputText from "../components/FormInputText/FormInputText";
import { Fragment, ReactElement } from "react";
import Button from "../components/Button/Button";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import { IWaypoint } from "../interfaces/task-management.interface";
import { useAppDispatch } from "../hooks/redux";
import { updateWaypoint } from "../toolkit/WaypointSlice";
import useTaskManagement from "../hooks/useTaskManagement";

interface IRMTaskWaypointUpdateModal {
  handleCloseModal: () => void;
  waypoint: IWaypoint;
}

export default function RMTaskWaypointUpdateModal({
  handleCloseModal,
  waypoint,
}: IRMTaskWaypointUpdateModal): ReactElement {
  const dispatch = useAppDispatch();

  const { reloadWaypoints } = useTaskManagement();

  const formik = useFormik({
    initialValues: waypoint,
    onSubmit: async (editedWaypoint) => {
      await dispatch(updateWaypoint(editedWaypoint));
      await reloadWaypoints();
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
      header={"Update Waypoint"}
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
              inputProps={formik.getFieldProps("position_x")}
              inputError={formik.errors.position_x}
              inputTouched={formik.touched.position_x}
            />
            <FormInputText
              type="number"
              labelName="Y:"
              labelInfoTip="Y coordinate of the waypoint"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("position_y")}
              inputError={formik.errors.position_y}
              inputTouched={formik.touched.position_y}
            />
            <FormInputText
              type="number"
              labelName="Z:"
              labelInfoTip="Z coordinate of the waypoint"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("position_z")}
              inputError={formik.errors.position_z}
              inputTouched={formik.touched.position_z}
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
              inputProps={formik.getFieldProps("orientation_x")}
              inputError={formik.errors.orientation_x}
              inputTouched={formik.touched.orientation_x}
            />
            <FormInputText
              type="number"
              labelName="Y:"
              labelInfoTip="Y coordinate of the waypoint"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("orientation_y")}
              inputError={formik.errors.orientation_y}
              inputTouched={formik.touched.orientation_y}
            />
            <FormInputText
              type="number"
              labelName="Z:"
              labelInfoTip="Z coordinate of the waypoint"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("orientation_z")}
              inputError={formik.errors.orientation_z}
              inputTouched={formik.touched.orientation_z}
            />
            <FormInputText
              type="number"
              labelName="W:"
              labelInfoTip="W coordinate of the waypoint"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("orientation_w")}
              inputError={formik.errors.orientation_w}
              inputTouched={formik.touched.orientation_w}
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
            text="Update Waypoint"
          />
        </div>
      </form>
    </Dialog>
  );
}
