import React, { ReactElement, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "../../../validations/UsersValidations";
import { InputText } from "primereact/inputtext";
import InputError from "../../../components/InputError/InputError";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage(): ReactElement {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    validationSchema: ForgotPasswordSchema,
    initialValues: {
      username: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      // dispatch(

      // )
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    },
  });

  return (
    <form
      className="flex flex-col w-80 gap-6 animate__animated animate__fadeIn"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <span className="p-float-label">
          <InputText
            {...formik.getFieldProps("username")}
            type="text"
            className="p-inputtext-sm w-full"
          />
          <label htmlFor="username">Username</label>
        </span>
        <InputError
          error={formik.errors.username}
          touched={formik.touched.username}
        />
      </div>
      <Button
        type="submit"
        label="Submit"
        onClick={() => formik.handleSubmit()}
        disabled={loading || !formik.isValid}
        loading={loading}
      />
      <p className="text-sm font-base text-center text-layer-dark-200">
        Not a Member yet?{" "}
        <Link className="text-primary" to={`/registration`}>
          Sign up
        </Link>{" "}
      </p>
    </form>
  );
}
