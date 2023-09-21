import { useFormik } from "formik";
import { Dialog } from "primereact/dialog";
import React, { ReactElement } from "react";
import InputText from "../components/InputText/InputText";
import InputError from "../components/InputError/InputError";
import Button from "../components/Button/Button";
import { useKeycloak } from "@react-keycloak/web";
import * as Yup from "yup";

interface IDeactiveAccountModal {
  visibleModal: boolean;
  handleCloseModal: () => void;
}

export default function DeactiveAccountModal({
  visibleModal,
  handleCloseModal,
}: IDeactiveAccountModal): ReactElement {
  const { keycloak } = useKeycloak();

  const formik = useFormik({
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Required")
        .equals(
          [keycloak?.tokenParsed?.preferred_username],
          "Username is not correct",
        ),
    }),
    initialValues: {
      username: "",
    },
    onSubmit: (values: any) => {},
  });

  return (
    <Dialog
      header="DeactiveAccountModal"
      visible={visibleModal}
      className="w-[30vw]"
      onHide={() => handleCloseModal()}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col gap-8"
      >
        <p className="text-sm">
          Please enter your username (
          <b>{keycloak?.tokenParsed?.preferred_username}</b>) to confirm that
          you want to deactivate your account.
        </p>
        <div className="w-full">
          <InputText
            {...formik.getFieldProps("username")}
            placeholder="Username"
            value={formik.values.username}
          />
          <InputError
            touched={formik.touched.username}
            error={formik.errors.username}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            className="!h-11 !w-56"
            type="submit"
            text="Deactive Account"
            disabled={formik.isSubmitting || !formik.isValid}
          />
        </div>
      </form>
    </Dialog>
  );
}
