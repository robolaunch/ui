import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import { useKeycloak } from "@react-keycloak/web";
import { useFormik } from "formik";
import InputError from "../InputError/InputError";
import InputCheckbox from "../InputCheckbox/InputCheckbox";

interface IProfileEmailPreferances {
  className?: string;
}

export default function ProfileEmailPreferances({
  className,
}: IProfileEmailPreferances): ReactElement {
  const { keycloak } = useKeycloak();
  console.log(keycloak?.tokenParsed);

  const formik = useFormik({
    initialValues: {
      creation: true,
      payout: false,
      refund: false,
    },
    onSubmit: (values: any) => {},
  });

  return (
    <CardLayout className={`flex flex-col gap-8 p-6 ${className}`}>
      <Fragment>
        <p className="text-lg font-bold text-layer-dark-600">
          Email Preferances
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-8 px-2"
        >
          <div>
            <div className="flex items-center gap-5">
              <InputCheckbox
                {...formik.getFieldProps("creation")}
                className="!scale-[1.7]"
              />
              <div className="flex flex-col justify-between">
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
              <div className="flex flex-col justify-between">
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
              <div className="flex flex-col justify-between">
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
              <div className="flex flex-col justify-between">
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
              <div className="flex flex-col justify-between">
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
        </form>
      </Fragment>
    </CardLayout>
  );
}
