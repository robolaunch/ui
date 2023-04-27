import { useFormik } from "formik";
import { Dialog } from "primereact/dialog";
import React, { Fragment, ReactElement, useContext } from "react";
import InputError from "../components/InputError/InputError";
import Button from "../components/Button/Button";
import InputSelect from "../components/InputSelect/InputSelect";
import { SidebarContext } from "../contexts/SidebarContext";
import { ImportRobotSetSidebarState } from "../validations/RobotsValidations";

interface IImportRobotModal {
  visibleModal: boolean;
  handleCloseModal: () => void;
  template: any;
}

export default function ImportRobotModal({
  visibleModal,
  handleCloseModal,
  template,
}: IImportRobotModal): ReactElement {
  const { setSelectedState, setSidebarState }: any = useContext(SidebarContext);

  const formik = useFormik({
    validationSchema: ImportRobotSetSidebarState,
    initialValues: {
      organization: "",
      roboticsCloud: "",
      fleet: "",
    },
    onSubmit: (values: any) => {
      formik.setSubmitting(true);
      setSelectedState({
        organization: values.organization,
        roboticsCloud: values.roboticsCloud,
        fleet: values.fleet,
      });
      setSidebarState({
        isOpen: true,
        isCreateMode: true,
        page: "robot",
      });
      formik.setSubmitting(false);
      handleCloseModal();
    },
  });

  return (
    <Dialog
      header="Import Robot"
      visible={visibleModal}
      className="w-[30vw]"
      onHide={() => handleCloseModal()}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-6"
      >
        <p className="text-sm">content</p>

        <div className="w-full">
          <InputSelect
            placeholder="Organization"
            {...formik.getFieldProps("organization")}
          >
            <Fragment>
              {!formik?.values?.organization && <option value=""></option>}
              <option value="organization1">Organization1</option>
              <option value="organization2">Organization2</option>
            </Fragment>
          </InputSelect>
          <InputError
            touched={formik.touched.organization}
            error={formik.errors.organization}
          />
        </div>
        <div className="w-full">
          <InputSelect
            placeholder="Robotics Cloud"
            {...formik.getFieldProps("roboticsCloud")}
          >
            <Fragment>
              {!formik?.values?.roboticsCloud && <option value=""></option>}
              <option value="roboticsCloud1">roboticsCloud1</option>
              <option value="roboticsCloud2">roboticsCloud2</option>
            </Fragment>
          </InputSelect>
          <InputError
            touched={formik.touched.roboticsCloud}
            error={formik.errors.roboticsCloud}
          />
        </div>
        <div className="w-full">
          <InputSelect placeholder="Fleet" {...formik.getFieldProps("fleet")}>
            <Fragment>
              {!formik?.values?.fleet && <option value=""></option>}
              <option value="fleet1">fleet1</option>
              <option value="fleet2">fleet2</option>
            </Fragment>
          </InputSelect>
          <InputError
            touched={formik.touched.fleet}
            error={formik.errors.fleet}
          />
        </div>
        <div className="flex justify-end items-center gap-4">
          <Button
            className="!w-56 !h-11"
            type="submit"
            text="Import Robot"
            disabled={formik.isSubmitting || !formik.isValid}
          />
        </div>
      </form>
    </Dialog>
  );
}
