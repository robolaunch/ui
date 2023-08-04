import {
  handleGetRandomString,
  organizationNameViewer,
} from "../functions/GeneralFunctions";
import DeployApplicationSelector from "../components/DeployApplicationSelector/DeployApplicationSelector";
import TrialStateViewer from "../components/TrialStateViewer/TrialStateViewer";
import React, { ReactElement, useEffect, useState } from "react";
import { envTrialApp } from "../helpers/envProvider";
import { createRobot } from "../toolkit/RobotSlice";
import { createTrial } from "../toolkit/TrialSlice";
import useFunctions from "../hooks/useFunctions";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import useMain from "../hooks/useMain";
import { useFormik } from "formik";

interface IDeployApplication {
  handleCloseModal: () => void;
  item: any;
}

export default function DeployApplication({
  handleCloseModal,
  item,
}: IDeployApplication): ReactElement {
  const [isTriggedCreateInfra, setIsTriggedCreateInfra] =
    useState<boolean>(false);
  const [responseOrganization, setResponseOrganization] =
    useState<any>(undefined);
  const [responseRoboticsCloud, setResponseRoboticsCloud] =
    useState<any>(undefined);
  const [responseInstance, setResponseInstance] = useState<any>(undefined);
  const [responseFleet, setResponseFleet] = useState<any>(undefined);
  const [robotName, setRobotName] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { trialState } = useMain();

  const {
    getOrganizations,
    getRoboticsClouds,
    getInstances,
    getFleets,
    getIP,
  } = useFunctions();

  useEffect(() => {
    !trialState?.ip && getIP();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trialState]);

  useEffect(() => {
    !robotName && setRobotName(item?.acronym + "-" + handleGetRandomString(5));

    if (envTrialApp) {
      if (responseOrganization === undefined) {
        getOrganizations({
          setFirstItemforTrial: setResponseOrganization,
        });
      } else if (responseOrganization && responseRoboticsCloud === undefined) {
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
        (responseInstance === undefined ||
          (isTriggedCreateInfra && responseInstance === null))
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
        responseFleet === undefined
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
    }

    const timerOrganization = setInterval(() => {
      !responseOrganization &&
        envTrialApp &&
        getOrganizations({
          setFirstItemforTrial: setResponseOrganization,
        });
    }, 10000);

    const timerRoboticsCloud = setInterval(() => {
      responseOrganization &&
        envTrialApp &&
        !responseRoboticsCloud &&
        getRoboticsClouds(
          {
            organizationId: responseOrganization?.organizationId,
          },
          {
            setFirstItemforTrial: setResponseRoboticsCloud,
          }
        );
    }, 10000);

    const timerInstance = setInterval(() => {
      responseInstance &&
        envTrialApp &&
        responseInstance?.instanceCloudState !== "ConnectionHub_Ready" &&
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
    }, 10000);

    const timerFleet = setInterval(() => {
      responseInstance?.instanceCloudState === "ConnectionHub_Ready" &&
        responseFleet?.fleetStatus !== "Ready" &&
        envTrialApp &&
        getFleets(
          {
            organizationId: responseOrganization?.organizationId,
            roboticsCloudName: responseRoboticsCloud?.name,
            region: responseRoboticsCloud?.region,
            instanceId: responseInstance?.instanceId,
          },
          {
            setFirstItemforTrial: setResponseFleet,
          }
        );
    }, 10000);

    return () => {
      clearInterval(timerOrganization);
      clearInterval(timerRoboticsCloud);
      clearInterval(timerInstance);
      clearInterval(timerFleet);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    responseOrganization,
    responseRoboticsCloud,
    responseInstance,
    responseFleet,
    isTriggedCreateInfra,
  ]);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      formik.setSubmitting(true);

      await dispatch(
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
    await dispatch(
      createTrial({
        ipAddress: trialState?.ip,
      })
    ).then(async () => {
      setTimeout(() => {
        setIsTriggedCreateInfra(true);
      }, 2000);
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
        {envTrialApp ? (
          <TrialStateViewer
            responseOrganization={responseOrganization}
            responseRoboticsCloud={responseRoboticsCloud}
            responseInstance={responseInstance}
            responseFleet={responseFleet}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          <DeployApplicationSelector />
        )}

        <div className="flex justify-end items-center gap-4">
          <Button
            className="!w-56 !h-11"
            type="button"
            text="Auto Create Infrastructure"
            disabled={isTriggedCreateInfra || responseInstance || responseFleet}
            onClick={() => handleCreateTrial()}
            loading={
              (responseInstance &&
                responseInstance?.instanceCloudState !==
                  "ConnectionHub_Ready") ||
              (responseFleet && responseFleet?.fleetStatus !== "Ready")
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
              responseInstance?.instanceCloudState !== "ConnectionHub_Ready" ||
              !responseFleet ||
              responseFleet?.fleetStatus !== "Ready"
            }
            loading={formik.isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  );
}
