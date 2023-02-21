import React, { ReactElement } from "react";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "../../../validations/UsersValidations";
import InputError from "../../../components/InputError/InputError";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import InputText from "../../../components/InputText/InputText";
import { useAppDispatch } from "../../../hooks/redux";
import { forgotPassword } from "../../../app/UserSlice";

export default function ForgotPasswordPage(): ReactElement {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    validationSchema: ForgotPasswordSchema,
    initialValues: {
      username: "",
    },
    onSubmit: (values) => {
      formik.setSubmitting(true);

      dispatch(
        forgotPassword({
          username: values.username,
        })
      );

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
          error={formik.errors.username}
          touched={formik.touched.username}
        />
      </div>
      <div>
        <Button
          type="submit"
          text="Submit"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
        />
      </div>
      <div>
        <p className="text-sm font-base text-center text-layer-dark-200">
          Not a Member yet?{" "}
          <Link className="text-primary" to={`/registration`}>
            Sign up
          </Link>{" "}
        </p>
      </div>
    </form>
  );
}
