import React, { ReactElement } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../../../validations/UsersValidations";
import InputText from "../../../components/InputText/InputText";
import InputError from "../../../components/InputError/InputError";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";

export default function LoginPage(): ReactElement {
  const formik = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      formik.setSubmitting(true);

      setTimeout(() => {
        formik.setSubmitting(false);
      }, 2000);
    },
  });

  return (
    <form
      className="flex flex-col w-80 gap-6 animate__animated animate__fadeIn"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <InputText
          {...formik.getFieldProps("username")}
          placeholder="Username"
          disabled={formik.isSubmitting}
        />
        <InputError
          touched={formik.touched.username}
          error={formik.errors.username}
        />
      </div>
      <div>
        <InputText
          {...formik.getFieldProps("password")}
          placeholder="Password"
          type="password"
          disabled={formik.isSubmitting}
        />
        <InputError
          touched={formik.touched.password}
          error={formik.errors.password}
        />
        <Link
          className="pt-3 text-sm font-base float-right text-primary"
          to={`/forgot-password`}
        >
          forgot password?
        </Link>
      </div>
      <div>
        <Button
          type="submit"
          text="Login to robolaunch"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
        />
      </div>
      <div>
        <p className="text-sm font-base text-center text-layer-dark-200">
          If you have not a account?
          <Link className="text-primary" to="/registration">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
