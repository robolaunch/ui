import React, { useState } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../../../validations/Validations";
import {
  InfoCircleOutlined,
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import { useAppDispatch } from "../../../hooks/redux";
import { loginUser } from "../../../app/UserSlice";
import { InputText } from "primereact/inputtext";
import InputError from "../../../components/InputError/InputError";
import { Button } from "primereact/button";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [showPasswordVisible, setShowPasswordVisible] = useState(false);
  const formik = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
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
    <form className="flex flex-col w-80 gap-6" onSubmit={formik.handleSubmit}>
      <div>
        <span className="p-float-label">
          <InputText
            {...formik.getFieldProps("username")}
            id="username"
            name="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
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
            {...formik.getFieldProps("password")}
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <label htmlFor="password">Password</label>
        </span>
        <InputError
          error={formik.errors.password}
          touched={formik.touched.password}
        />
      </div>
      <Button
        type="submit"
        label="Login to robolaunch"
        onClick={() => formik.handleSubmit()}
        disabled={loading || !formik.isValid}
        loading={loading}
      />
    </form>
  );
};
export default LoginPage;
