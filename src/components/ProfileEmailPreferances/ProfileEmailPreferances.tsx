import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import { useFormik } from "formik";
import InputError from "../InputError/InputError";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import Button from "../Button/Button";

interface IProfileEmailPreferances {
  className?: string;
}

export default function ProfileEmailPreferances({
  className,
}: IProfileEmailPreferances): ReactElement {
  const formik = useFormik({
    initialValues: {
      creation: true,
      payout: false,
      refund: false,
    },
    onSubmit: (values: any) => {},
  });

  return (
    <CardLayout className={`flex h-fit flex-col gap-8 p-6 ${className}`}>
      <Fragment>
        <p className="text-light-600 text-lg font-bold">Email Preferances</p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 px-2"
        >
          <div>
            <div className="flex items-center gap-5">
              <InputCheckbox
                {...formik.getFieldProps("creation")}
                className="!scale-[1.7]"
              />
              <div className="flex flex-col gap-1">
                <div className="text-light-700 text-sm font-medium">
                  Creation
                </div>
                <p className="text-light-600 text-xs font-light">
                  Receive email notifications when a new object is created
                </p>
              </div>
            </div>
            <InputError
              error={formik.errors.creation}
              touched={formik.errors.creation}
            />
          </div>
          <div>
            <div className="flex items-center gap-5">
              <InputCheckbox
                {...formik.getFieldProps("payout")}
                className="!scale-[1.7]"
              />
              <div className="flex flex-col gap-1">
                <div className="text-light-700 text-sm font-medium">Payout</div>
                <p className="text-light-600 text-xs font-light">
                  Receive email notifications when a new object is created
                </p>
              </div>
            </div>
            <InputError
              error={formik.errors.payout}
              touched={formik.errors.payout}
            />
          </div>
          <div>
            <div className="flex items-center gap-5">
              <InputCheckbox
                {...formik.getFieldProps("refund")}
                className="!scale-[1.7]"
              />
              <div className="flex flex-col gap-1">
                <div className="text-light-700 text-sm font-medium">Refund</div>
                <p className="text-light-600 text-xs font-light">
                  Receive email notifications when refund is requested
                </p>
              </div>
            </div>
            <InputError
              error={formik.errors.refund}
              touched={formik.errors.refund}
            />
          </div>
          <div>
            <div className="flex items-center gap-5">
              <InputCheckbox
                {...formik.getFieldProps("refund")}
                className="!scale-[1.7]"
              />
              <div className="flex flex-col gap-1">
                <div className="text-light-700 text-sm font-medium">Refund</div>
                <p className="text-light-600 text-xs font-light">
                  Receive email notifications when refund is requested
                </p>
              </div>
            </div>
            <InputError
              error={formik.errors.refund}
              touched={formik.errors.refund}
            />
          </div>
          <div>
            <div className="flex items-center gap-5">
              <InputCheckbox
                {...formik.getFieldProps("refund")}
                className="!scale-[1.7]"
              />
              <div className="flex flex-col gap-1">
                <div className="text-light-700 text-sm font-medium">Refund</div>
                <p className="text-light-600 text-xs font-light">
                  Receive email notifications when refund is requested
                </p>
              </div>
            </div>
            <InputError
              error={formik.errors.refund}
              touched={formik.errors.refund}
            />
          </div>
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
