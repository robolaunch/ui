import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { getReadyEnvironments } from "../../toolkit/EnvironmentSlice";
import InfoTip from "../InfoTip/InfoTip";
import InputError from "../InputError/InputError";
import Seperator from "../Seperator/Seperator";

interface IEnvironmentSelector {
  formik: any;
}

export default function EnvironmentSelector({
  formik,
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
    if (formik.values?.domainName) {
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
  }, [formik.values?.domainName]);

  return (
    <Fragment>
      <div>
        <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
          Categories:
          <InfoTip content="Select a categories." />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Array?.from(
            new Set(
              responseReadyEnvironments?.map((env: any) => env?.domainName)
            )
          )?.map((environment: any, index: number) => {
            return (
              <div
                key={index}
                className={`flex justify-center items-center py-3 px-1 border-2 rounded text-xs capitalize transition-300 ${
                  formik.values?.domainName === environment &&
                  "border-layer-primary-600 shadow"
                }`}
                onClick={() => formik.setFieldValue("domainName", environment)}
              >
                {environment}
              </div>
            );
          })}
        </div>
        <InputError error={formik.errors.domainName} touched={true} />
      </div>

      <Seperator />

      {formik.values?.domainName && (
        <div>
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
            Ready Environments:
            <InfoTip content="Type a new robot name." />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {responseReadyEnvironments
              ?.filter(
                (env: any) => env?.domainName === formik.values?.domainName
              )
              ?.map((environment: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-col gap-2 justify-center items-center px-1 py-3 border-2 rounded text-xs capitalize transition-300 ${
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
                    }`}
                    onClick={() => {
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
