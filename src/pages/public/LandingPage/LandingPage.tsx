import { useFormik } from "formik";
import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import InputError from "../../../components/InputError/InputError";
import { InputText } from "primereact/inputtext";
import {
  CreateOrganizationSchema,
  LoginOrganizationSchema,
} from "../../../validations/OrganizationsValidations";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import jwt_decode from "jwt-decode";
import { RootState } from "../../../resources/store";

export const LandingPage = () => {
  const [responseOrganizations, setResponseOrganizations] = useState<any>(null);
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="border shadow-lg px-10 py-20 rounded-lg">
        {responseOrganizations?.length > 0 ? (
          <LoginOrganizationPage
            responseOrganizations={responseOrganizations}
          />
        ) : (
          <CreateFirstOrganizationPage />
        )}
      </div>
    </div>
  );
};

const CreateFirstOrganizationPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { isSuccessCreateOrganization } = useAppSelector(
    (state: RootState) => state.organization
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      enterprise: false,
    },
    validationSchema: CreateOrganizationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 5000);
    },
  });

  return (
    <form className="flex flex-col gap-8 animate__animated animate__fadeIn">
      <div>
        <span className="p-float-label">
          <InputText
            {...formik.getFieldProps("name")}
            id="name"
            name="name"
            type="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <label htmlFor="name">Organization Name</label>
        </span>
        <InputError error={formik.errors.name} touched={formik.touched.name} />
      </div>
      <Button
        type="submit"
        label="Create a new organization"
        onClick={() => formik.handleSubmit()}
        disabled={loading || !formik.isValid}
        loading={loading}
      />
    </form>
  );
};

interface LoginOrganizationPageProps {
  responseOrganizations: any;
}

const LoginOrganizationPage: FC<LoginOrganizationPageProps> = ({
  responseOrganizations,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    validationSchema: LoginOrganizationSchema,
    initialValues: {
      // @ts-ignore
      username: jwt_decode(JSON.parse(localStorage.authTokens).idToken)
        .preferred_username,
      password: "",
      organization: {
        name: "",
      },
    },
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    },
  });
  return (
    <form className="flex flex-col w-80 gap-8" onSubmit={formik.handleSubmit}>
      <div>
        <Dropdown
          {...formik.getFieldProps("organization")}
          value={formik.values.organization}
          onChange={formik.handleChange}
          options={responseOrganizations}
          optionLabel="name"
          placeholder="Select a organization"
          className="w-full md:w-14rem"
        />
        <InputError
          error={formik.errors?.organization?.name}
          touched={formik.touched?.organization?.name}
        />
      </div>
      <div>
        <span className="p-float-label cursor-not-allowed">
          <InputText
            id="username"
            name="username"
            type="text"
            value={formik.values.username}
            disabled
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
        label="Login to organization"
        onClick={() => formik.handleSubmit()}
        disabled={loading || !formik.isValid}
        loading={loading}
      />
    </form>
  );
};
