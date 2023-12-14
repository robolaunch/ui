import React, { Fragment, ReactElement, useEffect, useState } from "react";
import useFunctions from "../../hooks/useFunctions";
import InputSelect from "../InputSelect/InputSelect";
import { useFormik } from "formik";
import { Separator } from "react-contexify";
import Button from "../Button/Button";
import { useAppDispatch } from "../../hooks/redux";
import {
  handleGetRandomString,
  organizationNameViewer,
} from "../../functions/GeneralFunctions";
import { createRobot } from "../../toolkit/RobotSlice";
import { useNavigate } from "react-router-dom";
import { createTrial } from "../../toolkit/TrialSlice";
import useMain from "../../hooks/useMain";
import { envApplication } from "../../helpers/envProvider";

interface IDeployApplicationSelector {
  item: any;
  handleCloseModal: () => void;
}

type formikValues = {
  organization:
    | {
        organizationId: string;
        organizationName: string;
      }
    | undefined;
  roboticscloud:
    | {
        name: string;
        region: string;
      }
    | undefined;
  instance:
    | {
        instanceId: string;
        name: string;
      }
    | undefined;
  fleet:
    | {
        fleetId: string;
        name: string;
      }
    | undefined;
};

export default function DeployApplicationSelector({
  item,
  handleCloseModal,
}: IDeployApplicationSelector): ReactElement {
  const [responseOrganizations, setResponseOrganizations] =
    useState<any>(undefined);
  const [responseRoboticsClouds, setResponseRoboticsClouds] =
    useState<any>(undefined);
  const [responseInstances, setResponseInstances] = useState<any>(undefined);
  const [responseFleets, setResponseFleets] = useState<any>(undefined);
  const { getOrganizations, getRoboticsClouds, getInstances, getFleets } =
    useFunctions();
  const dispatch = useAppDispatch();
  const { trialState } = useMain();
  const navigate = useNavigate();

  const formik = useFormik<formikValues>({
    initialValues: {
      organization: undefined,
      roboticscloud: undefined,
      instance: undefined,
      fleet: undefined,
    },

    onSubmit: async () => {
      formik.setSubmitting(true);

      await dispatch(
        createRobot({
          organizationId: formik.values?.organization?.organizationId!,
          roboticsCloudName: formik.values?.roboticscloud?.name!,
          instanceId: formik.values?.instance?.instanceId!,
          region: formik?.values?.roboticscloud?.region!,
          robotName: item?.acronym + "-" + handleGetRandomString(5),
          fleetName: formik.values.fleet?.name!,
          distributions: [item?.distro.toUpperCase()],
          bridgeEnabled: item?.type === "Environment" ? false : true,
          vdiEnabled: true,
          vdiSessionCount: 3,
          ideEnabled: true,
          storageAmount: item?.minStorageAmount,
          gpuEnabledForCloudInstance: true,
          marketPlaceEnabled: true,
          imageUser: item?.trialImage?.imageUser,
          imageRepository: item?.trialImage?.imageRepository,
          imageTag: item?.trialImage?.imageTag,
          workspaces: [
            {
              name: "ws-1",
              workspaceDistro: item?.distro?.toUpperCase(),
              robotRepositories: [
                {
                  url: item?.trialImage?.sampleRepository?.url,
                  branch: item?.trialImage?.sampleRepository?.branch,
                  name: "repo1",
                },
              ],
            },
          ],
        }),
      ).then(() => {
        navigate(
          `/${organizationNameViewer({
            organizationName: formik.values?.organization
              ?.organizationName as string,
            capitalization: false,
          })}/${formik.values?.roboticscloud?.name}/${formik.values?.instance
            ?.name}/${formik?.values?.fleet?.name}/`,
        );
        handleCloseModal();
      });
    },
  });

  useEffect(() => {
    if (!responseOrganizations) {
      getOrganizations({
        setResponse: setResponseOrganizations,
      });
    } else if (
      formik.values?.organization &&
      !formik.values?.roboticscloud &&
      !responseRoboticsClouds
    ) {
      getRoboticsClouds(
        {
          organizationId: formik.values?.organization?.organizationId,
        },
        {
          setResponse: setResponseRoboticsClouds,
        },
      );
    } else if (
      formik.values?.organization &&
      formik.values?.roboticscloud &&
      !formik.values?.instance &&
      !responseInstances
    ) {
      getInstances(
        {
          organizationId: formik.values?.organization?.organizationId,
          roboticsCloudName: formik.values?.roboticscloud?.name,
          region: formik.values?.roboticscloud?.region,
          details: false,
        },
        {
          setResponse: setResponseInstances,
        },
      );
    } else if (
      formik.values?.organization &&
      formik.values?.roboticscloud &&
      formik.values?.instance &&
      !formik.values?.fleet &&
      !responseFleets
    ) {
      getFleets(
        {
          organizationId: formik.values?.organization?.organizationId,
          roboticsCloudName: formik.values?.roboticscloud?.name,
          region: formik.values?.roboticscloud?.region,
          instanceId: formik.values?.instance?.instanceId,
        },
        {
          setResponse: setResponseFleets,
        },
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    responseOrganizations,
    responseRoboticsClouds,
    responseInstances,
    responseFleets,
    formik.values,
  ]);

  useEffect(() => {
    setResponseRoboticsClouds(undefined);
    setResponseInstances(undefined);
    setResponseFleets(undefined);
    formik.setValues({
      ...formik.values,
      roboticscloud: undefined,
      instance: undefined,
      fleet: undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.organization]);

  useEffect(() => {
    setResponseInstances(undefined);
    setResponseFleets(undefined);
    formik.setValues({
      ...formik.values,
      instance: undefined,
      fleet: undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.roboticscloud]);

  useEffect(() => {
    setResponseFleets(undefined);
    formik.setValues({
      ...formik.values,
      fleet: undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.instance]);

  async function handleCreateTrial() {
    await dispatch(
      createTrial({
        ipAddress: trialState?.ip,
      }),
    ).then(async () => {
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    });
  }

  const { setSidebarState } = useMain();

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex w-full flex-col gap-3 p-2"
    >
      {/* Organization */}
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <img
            className="h-5 w-5"
            src={`/svg/general/organization/organization-dark.svg`}
            alt="robolaunch"
          />
          <span className="text-xs capitalize">Organization</span>
        </div>
        <div className="flex items-center gap-3">
          {!formik?.values?.organization && (
            <span
              onClick={() => {
                handleCloseModal();
                setSidebarState((prev: any) => {
                  return { ...prev, isOpen: true, page: "organization" };
                });
              }}
              className="cursor-pointer text-xs text-light-700 hover:underline "
            >
              Create
            </span>
          )}
          <InputSelect
            className="min-w-[12rem]"
            {...formik.getFieldProps(`organization`)}
            placeholder=""
            disabled={formik?.isSubmitting}
            onChange={(e) => {
              formik.setFieldValue(
                `organization`,
                responseOrganizations.filter(
                  (org: any) => org.organizationName === e.target.value,
                )?.[0],
              );
            }}
            value={formik.values?.organization?.organizationName || ""}
          >
            <Fragment>
              {!formik?.values?.organization && <option value=""></option>}
              {responseOrganizations?.map((org: any, index: number) => (
                <option key={index} value={org.organizationName}>
                  {org.organizationName.split("_")[1]}
                </option>
              ))}
            </Fragment>
          </InputSelect>
        </div>
      </div>
      {/* Organization */}

      <Separator />

      {/* RC */}
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <img
            className="h-5 w-5"
            src={`/svg/general/roboticscloud/roboticscloud-gray.svg`}
            alt="robolaunch"
          />
          <span className="text-xs capitalize">Robotics Cloud</span>
        </div>
        <div className="flex items-center gap-3">
          {!formik?.values?.roboticscloud && (
            <span
              onClick={() => {
                handleCloseModal();
                setSidebarState((prev: any) => {
                  return { ...prev, isOpen: true, page: "roboticscloud" };
                });
              }}
              className="cursor-pointer text-xs text-light-700 hover:underline "
            >
              Create
            </span>
          )}
          <InputSelect
            className="min-w-[12rem]"
            {...formik.getFieldProps(`roboticscloud`)}
            placeholder=""
            disabled={formik?.isSubmitting}
            onChange={(e) => {
              formik.setFieldValue(
                `roboticscloud`,
                responseRoboticsClouds.filter(
                  (rc: any) => rc.name === e.target.value,
                )?.[0],
              );
            }}
            value={formik.values?.roboticscloud?.name || ""}
          >
            <Fragment>
              {!formik?.values?.roboticscloud && <option value=""></option>}
              {responseRoboticsClouds?.map((rc: any, index: number) => (
                <option key={index} value={rc.name}>
                  {rc.name}
                </option>
              ))}
            </Fragment>
          </InputSelect>
        </div>
      </div>
      {/* RC */}

      <Separator />

      {/* Instance */}
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <img
            className="h-5 w-5"
            src={`/svg/general/instance/instance-gray.svg`}
            alt="robolaunch"
          />
          <span className="text-xs capitalize">Cloud Instance</span>
        </div>
        <div className="flex items-center gap-3">
          {!formik?.values?.instance && (
            <span
              onClick={() => {
                handleCloseModal();
                setSidebarState((prev: any) => {
                  return { ...prev, isOpen: true, page: "instance" };
                });
              }}
              className="cursor-pointer text-xs text-light-700 hover:underline "
            >
              Create
            </span>
          )}
          <InputSelect
            className="min-w-[12rem]"
            {...formik.getFieldProps(`instance`)}
            placeholder=""
            disabled={formik?.isSubmitting}
            onChange={(e) => {
              formik.setFieldValue(
                `instance`,
                responseInstances.filter(
                  (instance: any) => instance.name === e.target.value,
                )?.[0],
              );
            }}
            value={formik.values?.instance?.name || ""}
          >
            <Fragment>
              {!formik?.values?.instance && <option value=""></option>}
              {responseInstances
                ?.filter(
                  (instance: any) =>
                    instance.instanceCloudState === "ConnectionHub_Ready",
                )
                ?.map((instance: any, index: number) => (
                  <option key={index} value={instance.name}>
                    {instance.name}
                  </option>
                ))}
            </Fragment>
          </InputSelect>
        </div>
      </div>
      {/* Instance */}

      <Separator />

      {/* Fleet */}
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <img
            className="h-5 w-5"
            src={`/svg/general/fleet/fleet-gray.svg`}
            alt="robolaunch"
          />
          <span className="text-xs capitalize">
            {envApplication ? "Namespace" : "Fleet"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {!formik?.values?.fleet && (
            <span
              onClick={() => {
                handleCloseModal();
                setSidebarState((prev: any) => {
                  return { ...prev, isOpen: true, page: "fleet" };
                });
              }}
              className="cursor-pointer text-xs text-light-700 hover:underline "
            >
              Create
            </span>
          )}
          <InputSelect
            className="min-w-[12rem]"
            {...formik.getFieldProps(`fleet`)}
            placeholder=""
            disabled={formik?.isSubmitting}
            onChange={(e) => {
              formik.setFieldValue(
                `fleet`,
                responseFleets.filter(
                  (fleet: any) => fleet.name === e.target.value,
                )?.[0],
              );
            }}
            value={formik.values?.fleet?.name || ""}
          >
            <Fragment>
              {!formik?.values?.fleet && <option value=""></option>}
              {responseFleets
                ?.filter((fleet: any) => fleet.fleetStatus === "Ready")
                ?.map((fleet: any, index: number) => (
                  <option key={index} value={fleet.name}>
                    {fleet.name}
                  </option>
                ))}
            </Fragment>
          </InputSelect>
        </div>
      </div>
      {/* Fleet */}

      <div className="flex items-center justify-end gap-4 pt-10">
        <Button
          className="!h-11 !w-56"
          type="button"
          text="Auto Create Infrastructure"
          onClick={() => handleCreateTrial()}
          loading={formik.isSubmitting}
          disabled={
            formik.isSubmitting ||
            (formik.values?.organization &&
            formik.values?.roboticscloud &&
            formik.values?.instance &&
            formik.values?.fleet
              ? true
              : false)
          }
        />
        <Button
          className="!h-11 !w-56"
          type="submit"
          text="Deploy Application"
          loading={formik.isSubmitting}
          disabled={
            formik.isSubmitting ||
            !formik.values?.organization ||
            !formik.values?.roboticscloud ||
            !formik.values?.instance ||
            !formik.values?.fleet
          }
        />
      </div>
    </form>
  );
}
