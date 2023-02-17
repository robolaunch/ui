import React, { ReactElement, useEffect, useState } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../../../validations/UsersValidations";
import { useAppDispatch } from "../../../hooks/redux";
import { loginUser } from "../../../app/UserSlice";
import InputError from "../../../components/InputError/InputError";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

export default function LoginPage(): ReactElement {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      dispatch(
        loginUser({
          username: values.username,
          password: values.password,
        })
      );
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
      <div>
        <span className="p-float-label">
          <Password
            {...formik.getFieldProps("password")}
            className="p-inputtext-sm w-full"
            toggleMask
            feedback={false}
          />
          <label htmlFor="password">Password</label>
        </span>
        <InputError
          error={formik.errors.password}
          touched={formik.touched.password}
        />
        <div className="text-right pt-1">
          <Link
            className="text-xs font-base  text-primary"
            to={`/forgot-password`}
          >
            Forgot Password?
          </Link>
        </div>
      </div>
      <Button
        type="submit"
        label="Login to robolaunch"
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
