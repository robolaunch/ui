import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import { useKeycloak } from "@react-keycloak/web";
import { useFormik } from "formik";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import Button from "../Button/Button";

interface IProfileNotifications {
  className?: string;
}

export default function ProfileNotifications({
  className,
}: IProfileNotifications): ReactElement {
  const { keycloak } = useKeycloak();
  console.log(keycloak?.tokenParsed);

  const formik = useFormik({
    initialValues: {
      creation: true,
    },
    onSubmit: (values: any) => {},
  });

  return (
    <CardLayout className={`flex flex-col gap-8 p-6 h-fit ${className}`}>
      <Fragment>
        <p className="text-lg font-bold text-layer-dark-600">
          Profile Notifications
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 px-2"
        >
          {["", "", "", "", "", ""].map((_, i: number) => (
            <div key={i} className="flex justify-between items-center py-1">
              <div className="flex flex-col gap-1">
                <div className="text-sm font-medium text-layer-dark-700">
                  Title #{i + 1}
                </div>
                <p className="text-xs font-light text-layer-light-600">
                  Description #{i + 1}
                </p>
              </div>
              <div className="flex gap-10">
                <div className="flex gap-2">
                  <InputCheckbox {...formik.getFieldProps("creation")} />
                  <span className="text-layer-dark-500 text-xs">Email</span>
                </div>
                <div className="flex gap-2">
                  <InputCheckbox {...formik.getFieldProps("creation")} />
                  <span className="text-layer-dark-500 text-xs">Phone</span>
                </div>
              </div>
            </div>
          ))}

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
