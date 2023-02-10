import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../../../validations/Validations";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import { Button } from "../../../components/Button/Button";
import { useAppDispatch } from "../../../hooks/redux";
import { loginUser } from "../../../app/UserSlice";

const LoginPage = () => {
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
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <Input
        {...formik.getFieldProps("username")}
        size="large"
        placeholder="Username"
        type="text"
        id="username"
        name="username"
        status={formik.errors.username ? "error" : ""}
        onChange={formik.handleChange}
        value={formik.values.username}
        prefix={<UserOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip
            title={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : "Enter your username"
            }
          >
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
      />
      <Input
        {...formik.getFieldProps("password")}
        size="large"
        placeholder="Password"
        type="password"
        id="password"
        name="password"
        status={formik.errors.password ? "error" : ""}
        onChange={formik.handleChange}
        value={formik.values.password}
        prefix={<UserOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip
            title={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : "Enter your password"
            }
          >
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
      />
      <Button
        type="submit"
        text="Login"
        onClick={() => formik.handleSubmit()}
        disabled={loading || !formik.isValid}
        loading={loading}
      />
    </form>
  );
};
export default LoginPage;
