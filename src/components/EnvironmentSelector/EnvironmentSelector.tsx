import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { getReadyEnvironments } from "../../toolkit/EnvironmentSlice";
import { useAppDispatch } from "../../hooks/redux";
import InputError from "../InputError/InputError";
import Seperator from "../Seperator/Seperator";
import InfoTip from "../InfoTip/InfoTip";

interface IEnvironmentSelector {
  formik: any;
  isImportRobot?: boolean;
}

export default function EnvironmentSelector({
  formik,
  isImportRobot,
}: IEnvironmentSelector): ReactElement {
  const [responseReadyEnvironments, setResponseReadyEnvironments] =
    useState<any>(undefined);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getReadyEnvironments()).then((response: any) => {
      setResponseReadyEnvironments(response?.payload?.environmentData);
    });
  }, [dispatch]);

  useEffect(() => {
    if (formik.initialValues?.domainName !== formik.values?.domainName) {
      formik.setFieldValue("application", {
        name: undefined,
        version: undefined,
      });
      formik.setFieldValue("devspace", {
        desktop: undefined,
        ubuntuDistro: undefined,
        version: undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik?.values?.domainName, formik?.initialValues?.domainName]);

  return (
    <Fragment>
      <div data-tut="create-application-step1-environment-selector">
        <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700">
          Categories:
          <InfoTip content="Select a categories." />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Array?.from(
            new Set(
              responseReadyEnvironments?.map((env: any) => env?.domainName),
            ),
          )?.map((environment: any, index: number) => {
            return (
              <div
                key={index}
                className={`transition-300 flex items-center justify-center rounded border-2 px-1 py-3 text-xs capitalize ${
                  formik.values?.domainName === environment &&
                  "border-layer-primary-600 shadow"
                }
                ${isImportRobot && "cursor-not-allowed"}
                `}
                onClick={() =>
                  !isImportRobot &&
                  formik.setFieldValue("domainName", environment)
                }
              >
                {(() => {
                  switch (environment) {
                    case "aiml":
                      return "AI & ML";
                    default:
                      return environment;
                  }
                })()}
              </div>
            );
          })}
        </div>
        <InputError error={formik.errors.domainName} touched={true} />
      </div>

      <Seperator />

      {formik.values?.domainName && (
        <div>
          <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700">
            Ready Environments:
            <InfoTip content="Type a new robot name." />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {responseReadyEnvironments
              ?.filter(
                (env: any) => env?.domainName === formik.values?.domainName,
              )
              ?.map((environment: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`transition-300 flex flex-col items-center justify-center gap-2 rounded border-2 px-1 py-3 text-xs capitalize ${
                      formik.values?.domainName === environment?.domainName &&
                      formik.values?.application?.name ===
                        environment?.application?.name &&
                      formik.values?.application?.version ===
                        environment?.application?.version &&
                      formik.values?.devspace?.desktop ===
                        environment?.devspace?.desktop &&
                      formik.values?.devspace?.ubuntuDistro ===
                        environment?.devspace?.ubuntuDistro &&
                      formik.values?.devspace?.version ===
                        environment?.devspace?.version &&
                      "border-layer-primary-600 shadow"
                    }
                    ${isImportRobot && "cursor-not-allowed"}
                    `}
                    onClick={() => {
                      !isImportRobot &&
                        formik.setValues({
                          ...formik.values,
                          domainName: environment?.domainName,
                          application: {
                            ...formik.values.application,
                            name: environment?.application?.name,
                            version: environment?.application?.version,
                          },
                          devspace: {
                            ...formik.values.devspace,
                            desktop: environment?.devspace?.desktop,
                            ubuntuDistro: environment?.devspace?.ubuntuDistro,
                            version: environment?.devspace?.version,
                          },
                        });
                    }}
                  >
                    <span>
                      {environment?.application?.name} v(
                      {environment?.application?.version})
                    </span>
                    <span>
                      {environment?.devspace?.desktop}{" "}
                      {environment?.devspace?.ubuntuDistro}{" "}
                      {environment?.devspace?.version}
                    </span>
                  </div>
                );
              })}
          </div>
          <InputError error={formik.errors.application?.name} touched={true} />
        </div>
      )}
    </Fragment>
  );
}
