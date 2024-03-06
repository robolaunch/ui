import { getReadyEnvironments } from "../../toolkit/EnvironmentSlice";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { FaDocker, FaLinux, FaTag } from "react-icons/fa";
import { useAppDispatch } from "../../hooks/redux";
import CFGridItem from "../CFGridItem/CFGridItem";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";

interface ICFEnvCategories {
  formik: FormikProps<IEnvironmentStep1>;
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
    if (
      formik.initialValues?.applicationConfig?.domainName !==
      formik.values?.applicationConfig?.domainName
    ) {
      const initialApplication = { name: undefined, version: undefined };
      const initialDevspace = {
        desktop: undefined,
        ubuntuDistro: undefined,
        version: undefined,
      };
      formik.setFieldValue("applicationConfig.application", initialApplication);
      formik.setFieldValue("applicationConfig.devspace", initialDevspace);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formik?.values?.applicationConfig?.domainName,
    formik?.initialValues?.applicationConfig?.domainName,
  ]);

  return (
    <Fragment>
      <CFInfoBar
        label="Application Categories:"
        tip="You can choose the image category and application here."
        dataTut="create-application-step1-environment-selector"
        error={formik.errors.applicationConfig?.application?.name}
        touched={true}
        vertical
      >
        <div className="flex w-full flex-col gap-6">
          <div className="grid grid-cols-5 gap-2">
            {Array.from(
              new Set(
                responseReadyEnvironments?.map((env: any) => env?.domainName),
              ),
            ).map((environment: any, index: number) => (
              <CFGridItem
                key={index}
                selected={
                  formik.values?.applicationConfig?.domainName === environment
                }
                disabled={disabled ? true : false}
                text={(() => {
                  switch (environment) {
                    case "plain":
                      return "Plain";
                    case "robotics":
                      return "Robotics";
                    case "simulation":
                      return "Simulation";
                    case "aiml":
                      return "AI & ML";
                    case "data-science":
                      return "Data Science";
                    case "cad":
                      return "CAD";
                    default:
                      return environment;
                  }
                })()}
                onClick={() =>
                  !disabled &&
                  formik.setFieldValue(
                    "applicationConfig.domainName",
                    environment,
                  )
                }
                className="!rounded-full !p-1.5"
              />
            ))}
          </div>

          {formik.values?.applicationConfig?.domainName && (
            <div className="grid grid-cols-2 gap-4">
              {responseReadyEnvironments
                ?.filter(
                  (env: any) =>
                    env?.domainName ===
                    formik.values?.applicationConfig?.domainName,
                )
                ?.map((environment: any, index: number) => (
                  <CFGridItem
                    key={index}
                    selected={
                      formik.values?.applicationConfig?.application?.name ===
                        environment?.application?.name &&
                      formik.values?.applicationConfig?.application?.version ===
                        environment?.application?.version &&
                      formik.values?.applicationConfig?.devspace?.desktop ===
                        environment?.devspace?.desktop &&
                      formik.values?.applicationConfig?.devspace
                        ?.ubuntuDistro ===
                        environment?.devspace?.ubuntuDistro &&
                      formik.values?.applicationConfig?.devspace?.version ===
                        environment?.devspace?.version
                    }
                    disabled={disabled ? true : false}
                    onClick={() => {
                      !disabled &&
                        formik.setValues({
                          ...formik.values,
                          applicationConfig: {
                            ...formik.values.applicationConfig,
                            application: {
                              ...formik.values.applicationConfig.application,
                              name: environment?.application?.name,
                              version: environment?.application?.version,
                            },
                            devspace: {
                              ...formik.values.applicationConfig.devspace,
                              desktop: environment?.devspace?.desktop,
                              ubuntuDistro: environment?.devspace?.ubuntuDistro,
                              version: environment?.devspace?.version,
                            },
                          },
                        });
                    }}
                    text={
                      <div className="flex w-full gap-2 p-1">
                        <img
                          className="flex h-full w-14 scale-90 items-center justify-center"
                          src={
                            environment?.application?.icon ||
                            "/svg/general/rocket.svg"
                          }
                          alt="img"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                        <div className=" flex flex-col justify-around">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium">
                              {environment?.application?.alias ||
                                environment?.application?.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaTag className="text-light-500" size={10} />
                            <p className="text-[0.66rem] font-light">
                              {environment?.application?.version}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaLinux className="text-light-600" size={12} />

                            <p className="text-[0.66rem] font-light">
                              {environment?.devspace?.ubuntuDistro.includes(
                                "focal",
                              )
                                ? "Ubuntu 20.04"
                                : environment?.devspace?.ubuntuDistro.includes(
                                      "jammy",
                                    )
                                  ? "Ubuntu 22.04"
                                  : environment?.devspace?.ubuntuDistro}{" "}
                              {environment?.devspace?.desktop}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            <FaDocker className="text-light-500" size={12} />

                            <p className="text-[0.66rem] font-light">
                              {environment?.devspace?.version}
                            </p>
                          </div>
                        </div>
                      </div>
                    }
                  />
                ))}
            </div>
          )}
        </div>
      </CFInfoBar>
    </Fragment>
  );
}
