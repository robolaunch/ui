import { useFormik } from "formik";
import { Dialog } from "primereact/dialog";
import React, { ReactElement } from "react";
import InputText from "../components/InputText/InputText";
import InputError from "../components/InputError/InputError";
import Button from "../components/Button/Button";

interface IImportRobotModal {
  visibleModal: boolean;
  handleCloseModal: () => void;
  template: {
    title: string;
    organization: string;
    type: string;
    rosDistro: string;
    star: boolean;
    starCount: number;
  };
}

export default function ImportRobotModal({
  visibleModal,
  handleCloseModal,
  template,
}: IImportRobotModal): ReactElement {
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
    },
    onSubmit: (values: any) => {},
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
        <p className="text-sm">text</p>
        <div className="w-full">
          <InputText
            {...formik.getFieldProps("email")}
            placeholder="Email"
            disabled={formik.isSubmitting}
            type="email"
          />
          <InputError
            touched={formik.touched.email}
            error={formik.errors.email}
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
