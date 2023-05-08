import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import InputText from "../InputText/InputText";
import { useKeycloak } from "@react-keycloak/web";
import { useFormik } from "formik";
import InputError from "../InputError/InputError";
import Gravatar from "react-gravatar";
import Button from "../Button/Button";

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
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-9">
          <div className="flex gap-3 pb-6">
            <Gravatar
              email={keycloak?.tokenParsed?.email}
              className="h-28 w-28 rounded"
              default="mp"
              size={144}
            />
            <div className="flex items-center text-sm text-layer-dark-600">
              <span>
                We use gravatar to get your avatar. If you want to change your
                avatar, please go to{" "}
                <a
                  href="https://gravatar.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-layer-primary-500 hover:underline"
                >
                  Gravatar
                </a>{" "}
                and update your avatar.
              </span>
            </div>
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
          <div className="flex items-center justify-end gap-6">
            <span
              className="text-xs font-medium text-layer-dark-500 cursor-pointer hover:underline"
              onClick={() => formik.resetForm()}
            >
              Discard
            </span>
            <Button className="!h-10 !w-36 text-xs" text={"Save Changes"} />
          </div>
        </form>
      </Fragment>
    </CardLayout>
  );
}
