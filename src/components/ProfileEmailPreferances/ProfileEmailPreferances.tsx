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
    <CardLayout className={`flex flex-col gap-8 p-6 h-fit ${className}`}>
      <Fragment>
        <p className="text-lg font-bold text-layer-dark-600">
          Email Preferances
        </p>
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
                <div className="text-sm font-medium text-layer-dark-700">
                  Creation
                </div>
                <p className="text-xs font-light text-layer-light-600">
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
                <div className="text-sm font-medium text-layer-dark-700">
                  Payout
                </div>
                <p className="text-xs font-light text-layer-light-600">
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
                <div className="text-sm font-medium text-layer-dark-700">
                  Refund
                </div>
                <p className="text-xs font-light text-layer-light-600">
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
                <div className="text-sm font-medium text-layer-dark-700">
                  Refund
                </div>
                <p className="text-xs font-light text-layer-light-600">
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
                <div className="text-sm font-medium text-layer-dark-700">
                  Refund
                </div>
                <p className="text-xs font-light text-layer-light-600">
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
