import React, { ReactElement } from "react";
import { useFormik } from "formik";
import { RegisterSchema } from "../../../validations/UsersValidations";
import InputError from "../../../components/InputError/InputError";
import { Link } from "react-router-dom";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import InputCheckbox from "../../../components/InputCheckbox/InputCheckbox";

export default function RegistrationPage(): ReactElement {
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
      formik.setSubmitting(true);
      console.log(values);

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
        <InputText
          {...formik.getFieldProps("firstName")}
          placeholder="First Name"
          disabled={formik.isSubmitting}
        />
        <InputError
          error={formik.errors.firstName}
          touched={formik.touched.firstName}
        />
      </div>
      <div>
        <InputText
          {...formik.getFieldProps("lastName")}
          placeholder="Last Name"
          disabled={formik.isSubmitting}
        />
        <InputError
          error={formik.errors.lastName}
          touched={formik.touched.lastName}
        />
      </div>
      <div>
        <InputText
          {...formik.getFieldProps("email")}
          placeholder="Email"
          type="email"
          disabled={formik.isSubmitting}
        />
        <InputError
          error={formik.errors.email}
          touched={formik.touched.email}
        />
      </div>
      <div>
        <span className="flex items-center gap-2">
          <InputCheckbox {...formik.getFieldProps("userAgreement")} />
          <label
            className="text-xs text-layer-dark-300"
            htmlFor="userAgreement"
          >
            Agree to User Agreement and Privacy Policy.
          </label>
        </span>
        <InputError
          error={formik.errors.userAgreement}
          touched={formik.touched.userAgreement}
        />
      </div>

      <div>
        <Button
          type="submit"
          text="Register to robolaunch"
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
        />
      </div>
      <p className="text-sm font-base text-center text-layer-dark-200">
        If you have a account?{" "}
        <Link className="text-primary" to={`/login`}>
          Login
        </Link>{" "}
      </p>
    </form>
  );
}
