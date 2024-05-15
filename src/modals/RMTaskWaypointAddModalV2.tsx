import CFCancelButton from "../components/CFCancelButton/CFCancelButton";
import FormInputText from "../components/FormInputText/FormInputText";
import { Fragment, ReactElement } from "react";
import Button from "../components/Button/Button";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import { IWaypoint } from "../interfaces/task-management.interface";
import { useAppDispatch } from "../hooks/redux";
import useTaskManagement from "../hooks/useTaskManagement";
import { addWaypoint } from "../toolkit/WaypointSlice";

interface IRMTaskWaypointAddModalV2 {
  handleCloseModal: () => void;
}

export default function RMTaskWaypointAddModalV2({
  handleCloseModal,
}: IRMTaskWaypointAddModalV2): ReactElement {
  const dispatch = useAppDispatch();

  const { reloadWaypoints } = useTaskManagement();

  const formik = useFormik<IWaypoint>({
    initialValues: {
      waypoint_id: 0,
      waypoint_name: "",
      position_x: 0,
      position_y: 0,
      position_z: 0,
      orientation_x: 0,
      orientation_y: 0,
      orientation_z: 0,
      orientation_w: 0,
    },
    onSubmit: async (waypoint) => {
      await dispatch(addWaypoint(waypoint));
      await reloadWaypoints();
      await handleCloseModal();
    },
  });

  const header = (type: "position" | "orientation" | "name") => (
    <Fragment>
      <label className="text-sm font-semibold">
        {(() => {
          switch (type) {
            case "position":
              return "Position";
            case "orientation":
              return "Orientation";
            case "name":
              return "Waypoint Name";
            default:
              return "";
          }
        })()}
      </label>
      <p className="text-sm font-medium">
        {(() => {
          switch (type) {
            case "position":
              return "Enter the position of the waypoint";
            case "orientation":
              return "Enter the position of the orientation";
            case "name":
              return "Enter the name of the waypoint";
            default:
              return "";
          }
        })()}
      </p>
    </Fragment>
  );

  return (
    <Dialog
      header="Add Waypoint"
      visible={true}
      className="flex h-fit w-[40vw] "
      onHide={handleCloseModal}
      draggable={false}
    >
      <form className="flex flex-col gap-10 p-2" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          {header("name")}
          <div className="flex gap-4">
            <FormInputText
              type="text"
              labelName="Name:"
              labelInfoTip="Name of the waypoint"
              classNameContainer="flex gap-4 items-center"
              classNameInput="!p-0"
              disabled={formik.isSubmitting}
              inputProps={formik.getFieldProps("waypoint_name")}
              inputError={formik.errors.waypoint_name}
              inputTouched={formik.touched.waypoint_name}
            />
          </div>
        </div>
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
            text="Add Waypoint"
          />
        </div>
      </form>
    </Dialog>
  );
}
