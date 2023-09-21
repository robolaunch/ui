import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import InputError from "../InputError/InputError";
import { useKeycloak } from "@react-keycloak/web";
import { MdOutlineCancel } from "react-icons/md";
import InputText from "../InputText/InputText";
import { TbEdit } from "react-icons/tb";
import Button from "../Button/Button";
import Gravatar from "react-gravatar";
import { useFormik } from "formik";

interface IProfileInfo {
  className?: string;
}

export default function ProfileInfo({ className }: IProfileInfo): ReactElement {
  const [isEditModeActive, setIsEditModeActive] =
    React.useState<boolean>(false);
  const { keycloak } = useKeycloak();

  const formik = useFormik({
    initialValues: {
      username: keycloak?.tokenParsed?.preferred_username,
      firstName: keycloak?.tokenParsed?.given_name,
      lastName: keycloak?.tokenParsed?.family_name,
      email: keycloak?.tokenParsed?.email,
      company: "",
    },
    onSubmit: (values: any) => {
      // action
      setIsEditModeActive(false);
    },
  });

  return (
    <CardLayout
      className={`flex flex-col gap-8 p-6 ${className} transition-all duration-500`}
    >
      <Fragment>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-layer-dark-600">Profile Info</p>
          {isEditModeActive ? (
            <MdOutlineCancel
              className="cursor-pointer"
              onClick={() => {
                formik.resetForm();
                setIsEditModeActive(false);
              }}
              size={22}
            />
          ) : (
            <TbEdit
              className="cursor-pointer"
              onClick={() => setIsEditModeActive(true)}
              size={22}
            />
          )}
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-9">
          <div className="flex gap-3 pb-6">
            <Gravatar
              email={keycloak?.tokenParsed?.email}
              className="h-32 w-32 rounded"
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
              disabled={!isEditModeActive || formik.isSubmitting}
              className="!text-sm"
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
                disabled={!isEditModeActive || formik.isSubmitting}
                className="!text-sm"
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
                disabled={!isEditModeActive || formik.isSubmitting}
                className="!text-sm"
              />
              <InputError
                error={formik.errors.lastName}
                touched={formik.errors.lastName}
              />
            </div>
          </div>
          <div>
            <InputText
              {...formik.getFieldProps("email")}
              placeholder="Email"
              disabled={!isEditModeActive || formik.isSubmitting}
              className="!text-sm"
            />
            <InputError
              error={formik.errors.email}
              touched={formik.errors.email}
            />
          </div>
          <div>
            <InputText
              {...formik.getFieldProps("company")}
              placeholder="Company"
              disabled={!isEditModeActive || formik.isSubmitting}
              className="!text-sm"
            />
            <InputError
              error={formik.errors.company}
              touched={formik.errors.company}
            />
          </div>
          {isEditModeActive && (
            <div className="flex items-center justify-end gap-6">
              <span
                className="cursor-pointer text-xs font-medium text-layer-dark-500 hover:underline"
                onClick={() => formik.resetForm()}
              >
                Discard
              </span>
              <Button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
                className="!h-10 !w-36 text-xs"
                text={"Save Changes"}
              />
            </div>
          )}
        </form>
      </Fragment>
    </CardLayout>
  );
}
