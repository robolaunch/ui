import {
  handleGetRandomString,
  organizationNameViewer,
} from "../functions/GeneralFunctions";
import { createRobot } from "../toolkit/RobotSlice";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import React, { ReactElement, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import TrialStateViewer from "../components/TrialStateViewer/TrialStateViewer";
import { createTrial } from "../toolkit/TrialSlice";
import useFunctions from "../hooks/useFunctions";

interface IDeployApplication {
  handleCloseModal: () => void;
  item: any;
}

export default function DeployApplication({
  handleCloseModal,
  item,
}: IDeployApplication): ReactElement {
  const [triggeredCreateInfrastucture, setTriggeredCreateInfrastucture] =
    useState<boolean>(false);
  const [robotName, setRobotName] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [responseOrganization, setResponseOrganization] =
    useState<any>(undefined);
  const [responseRoboticsCloud, setResponseRoboticsCloud] =
    useState<any>(undefined);
  const [responseInstance, setResponseInstance] = useState<any>(undefined);
  const [responseFleet, setResponseFleet] = useState<any>(undefined);

  const { getOrganizations, getRoboticsClouds, getInstances, getFleets } =
    useFunctions();

  useEffect(() => {
    if (!responseOrganization) {
      getOrganizations({
        setFirstItemforTrial: setResponseOrganization,
      });
    } else if (responseOrganization && !responseRoboticsCloud) {
      getRoboticsClouds(
        {
          organizationId: responseOrganization?.organizationId,
        },
        {
          setFirstItemforTrial: setResponseRoboticsCloud,
        }
      );
    } else if (
      responseOrganization &&
      responseRoboticsCloud &&
      !responseInstance
    ) {
      getInstances(
        {
          organizationId: responseOrganization?.organizationId,
          roboticsCloudName: responseRoboticsCloud?.name,
          region: responseRoboticsCloud?.region,
          details: true,
        },
        {
          setFirstItemforTrial: setResponseInstance,
        }
      );
    } else if (
      responseOrganization &&
      responseRoboticsCloud &&
      responseInstance?.instanceCloudState === "ConnectionHub_Ready" &&
      !responseFleet
    ) {
      getFleets(
        {
          organizationId: responseOrganization?.organizationId,
          roboticsCloudName: responseRoboticsCloud?.name,
          region: responseRoboticsCloud?.region,
          instanceId: responseInstance?.instanceId,
        },
        { setFirstItemforTrial: setResponseFleet }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    responseOrganization,
    responseRoboticsCloud,
    responseInstance,
    responseFleet,
  ]);

  useEffect(() => {
    setRobotName(item?.acronym + "-" + handleGetRandomString(5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      formik.setSubmitting(true);

      dispatch(
        createRobot({
          organizationId: responseOrganization?.organizationId,
          roboticsCloudName: responseRoboticsCloud?.name,
          instanceId: responseInstance?.instanceId,
          region: responseRoboticsCloud?.region,
          robotName: robotName,
          fleetName: responseFleet?.name,
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
        })
      ).then(() => {
        navigate(
          `/${organizationNameViewer({
            organizationName: responseOrganization?.organizationName,
            capitalization: false,
          })}/${responseRoboticsCloud?.name}/${responseInstance?.name}/${
            responseFleet?.name
          }/${robotName}`
        );
        handleCloseModal();
      });
    },
  });

  async function handleCreateTrial() {
    setTriggeredCreateInfrastucture(true);
    await dispatch(
      createTrial({
        ipAddress: "",
      })
    ).then((res: any) => {
      console.log("trial created");
      setTimeout(() => {
        console.log("trial created and reloaded");
      }, 10000);
    });
  }

  return (
    <Dialog
      header="Deploy Application"
      visible={true}
      draggable={false}
      className="w-[36vw]"
      onHide={() => handleCloseModal()}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-10"
      >
        <TrialStateViewer handleCloseModal={handleCloseModal} />
        <div className="flex justify-end items-center gap-4">
          <Button
            className="!w-56 !h-11"
            type="button"
            text="Auto Creation All"
            disabled={
              triggeredCreateInfrastucture ||
              formik.isSubmitting ||
              !formik.isValid ||
              (responseOrganization &&
                responseRoboticsCloud &&
                responseInstance)
            }
            onClick={() => handleCreateTrial()}
            loading={
              !responseOrganization ||
              !responseRoboticsCloud ||
              !responseInstance
                ? triggeredCreateInfrastucture
                : false
            }
          />
          <Button
            className="!w-56 !h-11"
            type="submit"
            text="Deploy Application"
            disabled={
              formik.isSubmitting ||
              !formik.isValid ||
              !responseOrganization ||
              !responseRoboticsCloud ||
              !responseInstance ||
              responseInstance?.instanceCloudState !== "ConnectionHub_Ready"
            }
            loading={formik.isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  );
}
