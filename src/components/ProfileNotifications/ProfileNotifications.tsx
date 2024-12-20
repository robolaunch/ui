import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import { useFormik } from "formik";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import Button from "../Button/Button";

interface IProfileNotifications {
  className?: string;
}

export default function ProfileNotifications({
  className,
}: IProfileNotifications): ReactElement {
  const formik = useFormik({
    initialValues: {
      creation: true,
    },
    onSubmit: (values: any) => {},
  });

  return (
    <CardLayout className={`flex h-fit flex-col gap-8 p-6 ${className}`}>
      <Fragment>
        <p className="text-light-600 text-lg font-bold">
          Profile Notifications
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 px-2"
        >
          {["", "", "", "", "", ""].map((_, i: number) => (
            <div key={i} className="flex items-center justify-between py-1">
              <div className="flex flex-col gap-1">
                <div className="text-light-700 text-sm font-medium">
                  Title #{i + 1}
                </div>
                <p className="text-light-600 text-xs font-light">
                  Description #{i + 1}
                </p>
              </div>
              <div className="flex gap-10">
                <div className="flex gap-2">
                  <InputCheckbox {...formik.getFieldProps("creation")} />
                  <span className="text-light-500 text-xs">Email</span>
                </div>
                <div className="flex gap-2">
                  <InputCheckbox {...formik.getFieldProps("creation")} />
                  <span className="text-light-500 text-xs">Phone</span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-end gap-6">
            <span
              className="text-light-500 cursor-pointer text-xs font-medium hover:underline"
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
