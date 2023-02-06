import React, { useEffect } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../../../validations/Validations";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";

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

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.values]);

  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <Input
        placeholder="Username"
        type="text"
        id="username"
        name="username"
        status={formik.errors.username ? "error" : ""}
        onChange={formik.handleChange}
        value={formik.values.username}
        prefix={<UserOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip title="Enter your username">
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
      />
      <Input
        placeholder="Password"
        type="password"
        id="password"
        name="password"
        status={formik.errors.password ? "error" : ""}
        onChange={formik.handleChange}
        value={formik.values.password}
        prefix={<UserOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip title="Enter your password">
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
      />
      <Button onClick={() => formik.handleSubmit()} type="primary" block>
        Login
      </Button>
    </form>
  );
};
export default LoginPage;
