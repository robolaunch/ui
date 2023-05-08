import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import InputText from "../InputText/InputText";
import { useKeycloak } from "@react-keycloak/web";
import { useFormik } from "formik";
import InputError from "../InputError/InputError";
import Gravatar from "react-gravatar";

interface IProfileInfo {
  className?: string;
}

export default function ProfileInfo({ className }: IProfileInfo): ReactElement {
  const { keycloak } = useKeycloak();
  console.log(keycloak?.tokenParsed);

  const formik = useFormik({
    initialValues: {
      username: keycloak?.tokenParsed?.preferred_username,
      firstName: keycloak?.tokenParsed?.given_name,
      lastName: keycloak?.tokenParsed?.family_name,
      email: keycloak?.tokenParsed?.email,
      company: "",
    },
    onSubmit: (values: any) => {},
  });

  return (
    <CardLayout className={`flex flex-col gap-8 p-6 ${className}`}>
      <Fragment>
        <p className="text-lg font-bold text-layer-dark-600">Profile Info</p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
          <div className="flex">
            <span>Avatar</span>
            <Gravatar
              email={keycloak?.tokenParsed?.email}
              className="h-9 w-9 rounded"
              default="mp"
            />
          </div>
          <div>
            <InputText
              {...formik.getFieldProps("username")}
              placeholder="Username"
            />
            <InputError
              error={formik.errors.username}
              touched={formik.errors.username}
            />
          </div>
          <div className="flex gap-6">
            <div className="w-full">
              <InputText
                {...formik.getFieldProps("firstName")}
                placeholder="First Name"
              />
              <InputError
                error={formik.errors.firstName}
                touched={formik.errors.firstName}
              />
            </div>
            <div className="w-full">
              <InputText
                {...formik.getFieldProps("lastName")}
                placeholder="Last Name"
              />
              <InputError
                error={formik.errors.lastName}
                touched={formik.errors.lastName}
              />
            </div>
          </div>
          <div>
            <InputText {...formik.getFieldProps("email")} placeholder="Email" />
            <InputError
              error={formik.errors.email}
              touched={formik.errors.email}
            />
          </div>
          <div>
            <InputText
              {...formik.getFieldProps("company")}
              placeholder="Company"
            />
            <InputError
              error={formik.errors.company}
              touched={formik.errors.company}
            />
          </div>
        </form>
      </Fragment>
    </CardLayout>
  );
}
