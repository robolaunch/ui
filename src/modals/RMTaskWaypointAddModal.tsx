import InputText from "../components/InputText/InputText";
import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";
import { useFormik } from "formik";

interface IRMTaskWaypointAddModal {
  handleCloseModal: () => void;
}

export default function RMTaskWaypointAddModal({
  handleCloseModal,
}: IRMTaskWaypointAddModal): ReactElement {
  //
  //
  const formik = useFormik({
    initialValues: {
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
    },
  });

  return (
    <Dialog
      header="Add Waypoint"
      visible={true}
      className="h-full w-[40vw]"
      onHide={handleCloseModal}
    >
      <div className="flex gap-4">
        <InputText
          type="number"
          placeholder="X: "
          {...formik.getFieldProps("position.x")}
          value={String(formik.values.position.x)}
          onChange={(e) =>
            formik.setFieldValue("position.x", Number(e.target.value))
          }
        />
        <InputText
          type="number"
          placeholder="Y: "
          {...formik.getFieldProps("position.y")}
          value={String(formik.values.position.y)}
          onChange={(e) =>
            formik.setFieldValue("position.y", Number(e.target.value))
          }
        />
        <InputText
          type="number"
          placeholder="Z: "
          {...formik.getFieldProps("position.z")}
          value={String(formik.values.position.z)}
          onChange={(e) =>
            formik.setFieldValue("position.z", Number(e.target.value))
          }
        />
      </div>
    </Dialog>
  );
}
