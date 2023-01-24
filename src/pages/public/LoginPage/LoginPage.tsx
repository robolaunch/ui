import React, { useEffect } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../../../validations/Validations";
import InputText from "../../../components/InputText/InputText";
import InputError from "../../../components/InputError/InputError";

const LoginPage = () => {
  const formik = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
      <div>
        <InputText
          labelText="Username"
          id="username"
          name="username"
          info={false}
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <InputError
          touched={formik.touched.username}
          error={formik.errors.username}
        />
      </div>
      <div>
        <InputText
          labelText="Password"
          id="password"
          name="password"
          info={false}
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <InputError
          touched={formik.touched.password}
          error={formik.errors.password}
        />
      </div>
      <button className="btn btn-primary w-full" type="submit">
        Submit
      </button>
    </form>
  );
};
export default LoginPage;
