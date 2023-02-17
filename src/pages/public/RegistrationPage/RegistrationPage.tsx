import React, { ReactElement, useState } from "react";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../hooks/redux";
import { RegisterSchema } from "../../../validations/UsersValidations";
import { InputText } from "primereact/inputtext";
import InputError from "../../../components/InputError/InputError";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { registerUser } from "../../../app/UserSlice";
import { Checkbox } from "primereact/checkbox";

export default function RegistrationPage(): ReactElement {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    validationSchema: RegisterSchema,
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      userAgreement: false,
    },
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      dispatch(
        registerUser({
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
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
          <InputText
            {...formik.getFieldProps("firstName")}
            type="text"
            className="p-inputtext-sm w-full"
          />
          <label htmlFor="firstName">First Name</label>
        </span>
        <InputError
          error={formik.errors.firstName}
          touched={formik.touched.firstName}
        />
      </div>
      <div>
        <span className="p-float-label">
          <InputText
            {...formik.getFieldProps("lastName")}
            type="text"
            className="p-inputtext-sm w-full"
          />
          <label htmlFor="lastName">Last Name</label>
        </span>
        <InputError
          error={formik.errors.lastName}
          touched={formik.touched.lastName}
        />
      </div>
      <div>
        <span className="p-float-label">
          <InputText
            {...formik.getFieldProps("email")}
            type="email"
            className="p-inputtext-sm w-full"
          />
          <label htmlFor="email">Email</label>
        </span>
        <InputError
          error={formik.errors.email}
          touched={formik.touched.email}
        />
      </div>
      <div>
        <span className="flex items-center gap-2">
          <Checkbox
            checked={formik.values.userAgreement}
            {...formik.getFieldProps("userAgreement")}
          />
          <label
            className="text-xs text-layer-dark-300"
            htmlFor="userAgreement"
          >
            Agree to User Agreement, Privacy Policy and Cookie Policy.
          </label>
        </span>
      </div>

      <Button
        type="submit"
        label="Register to robolaunch"
        onClick={() => formik.handleSubmit()}
        disabled={loading || !formik.isValid}
        loading={loading}
      />
      <p className="text-sm font-base text-center text-layer-dark-200">
        If you have a account?{" "}
        <Link className="text-primary" to={`/login`}>
          Login
        </Link>{" "}
      </p>
    </form>
  );
}
