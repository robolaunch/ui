import { getReadyEnvironments } from "../../toolkit/EnvironmentSlice";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { IDetails } from "../../interfaces/robotInterfaces";
import { useAppDispatch } from "../../hooks/redux";
import CFGridItem from "../CFGridItem/CFGridItem";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { FaDocker, FaLinux, FaTag } from "react-icons/fa";

interface ICFEnvCategories {
  formik: FormikProps<IDetails>;
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
        label="Application Categories:"
        tip="You can choose the image category and application here."
        dataTut="create-application-step1-environment-selector"
        error={formik.errors.application?.name}
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
                selected={formik.values?.domainName === environment}
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
                    default:
                      return environment;
                  }
                })()}
                onClick={() =>
                  !disabled && formik.setFieldValue("domainName", environment)
                }
                className="!rounded-full !p-1.5"
              />
            ))}
          </div>

          {formik.values?.domainName && (
            <div className="grid grid-cols-2 gap-4">
              {responseReadyEnvironments
                ?.filter(
                  (env: any) => env?.domainName === formik.values?.domainName,
                )
                ?.map((environment: any, index: number) => (
                  <CFGridItem
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
                      <div className="flex w-full">
                        {/* <img
                          className="col-span-1 mx-auto w-11"
                          src={`/svg/apps/${(() => {
                            if (
                              environment?.application?.name.includes(
                                "carla",
                              ) ||
                              environment?.application?.version.includes(
                                "carla",
                              )
                            ) {
                              return "carla";
                            }
                            if (
                              environment?.application?.name.includes("foxy") ||
                              environment?.application?.version.includes("foxy")
                            ) {
                              return "foxy";
                            }
                            if (
                              environment?.application?.name.includes(
                                "galactic",
                              ) ||
                              environment?.application?.version.includes(
                                "galactic",
                              )
                            ) {
                              return "galactic";
                            }
                            if (
                              environment?.application?.name.includes("iron") ||
                              environment?.application?.version.includes("iron")
                            ) {
                              return "iron";
                            }
                            if (
                              environment?.application?.name.includes(
                                "humble",
                              ) ||
                              environment?.application?.version.includes(
                                "humble",
                              )
                            ) {
                              return "humble";
                            }
                            if (
                              environment?.application?.name.includes(
                                "isaac",
                              ) ||
                              environment?.application?.version.includes(
                                "isaac",
                              )
                            ) {
                              return "nvidia";
                            }

                            return "ubuntu";
                          })()}.svg`}
                          alt="img"
                        /> */}
                        <img
                          className="flex h-full w-20 scale-75 items-center justify-center"
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
                          <div className="flex items-center justify-between gap-2  ">
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

                            <p className="text-[0.66rem] font-light capitalize">
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
