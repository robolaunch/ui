import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { getReadyEnvironments } from "../../toolkit/EnvironmentSlice";
import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import CFGridButton from "../CFGridButton/CFGridButton";
import { useAppDispatch } from "../../hooks/redux";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";

interface ICFEnvCategories {
  formik: FormikProps<IRobotStep1>;
  disabled?: boolean;
}

export default function CFEnvCategories({
  formik,
  disabled,
}: ICFEnvCategories): ReactElement {
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
      const initialApplication = { name: undefined, version: undefined };
      const initialDevspace = {
        desktop: undefined,
        ubuntuDistro: undefined,
        version: undefined,
      };
      formik.setFieldValue("application", initialApplication);
      formik.setFieldValue("devspace", initialDevspace);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik?.values?.domainName, formik?.initialValues?.domainName]);

  return (
    <Fragment>
      <CFInfoBar
        label="Categories"
        tip="Select a category."
        dataTut="create-application-step1-environment-selector"
        error={!!formik.errors.domainName}
        touched={true}
        vertical
      >
        <div className="grid grid-cols-3 gap-2">
          {Array.from(
            new Set(
              responseReadyEnvironments?.map((env: any) => env?.domainName),
            ),
          ).map((environment: any, index: number) => (
            <CFGridButton
              key={index}
              selected={formik.values?.domainName === environment}
              disabled={disabled ? true : false}
              text={environment === "aiml" ? "AI & ML" : environment}
              onClick={() =>
                !disabled && formik.setFieldValue("domainName", environment)
              }
            />
          ))}
        </div>
      </CFInfoBar>

      {formik.values?.domainName && (
        <CFInfoBar
          label=" Ready Environments:"
          tip="Select a ready environment."
          error={!!formik.errors.application?.name}
          touched={true}
          vertical
        >
          <div className="grid grid-cols-2 gap-2">
            {responseReadyEnvironments
              ?.filter(
                (env: any) => env?.domainName === formik.values?.domainName,
              )
              ?.map((environment: any, index: number) => (
                <CFGridButton
                  key={index}
                  selected={
                    formik.values?.application?.name ===
                      environment?.application?.name &&
                    formik.values?.application?.version ===
                      environment?.application?.version &&
                    formik.values?.devspace?.desktop ===
                      environment?.devspace?.desktop &&
                    formik.values?.devspace?.ubuntuDistro ===
                      environment?.devspace?.ubuntuDistro &&
                    formik.values?.devspace?.version ===
                      environment?.devspace?.version
                  }
                  disabled={disabled ? true : false}
                  onClick={() => {
                    !disabled &&
                      formik.setValues({
                        ...formik.values,
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
                  text={
                    <div className="flex flex-col gap-1 text-center">
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
                  }
                />
              ))}
          </div>
        </CFInfoBar>
      )}
    </Fragment>
  );
}
