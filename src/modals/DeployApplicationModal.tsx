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
import useTrial from "../hooks/useTrial";
import { useFormik } from "formik";
import TrialStateViewer from "../components/TrialStateViewer/TrialStateViewer";
import { createTrial } from "../toolkit/TrialSlice";

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
  const { trialState, handleReload } = useTrial();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleReload();
    setRobotName(item?.acronym + "-" + handleGetRandomString(5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      formik.setSubmitting(true);

      dispatch(
        createRobot({
          organizationId: trialState?.organization?.organizationId,
          roboticsCloudName: trialState?.roboticsCloud?.name,
          instanceId: trialState?.instance?.instanceId,
          region: trialState?.roboticsCloud?.region,
          robotName: robotName,
          fleetName: trialState?.fleet?.name,
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
            organizationName: trialState?.organization?.organizationName,
            capitalization: false,
          })}/${trialState?.roboticsCloud?.name}/${
            trialState?.instance?.name
          }/${trialState?.fleet?.name}/${robotName}`
        );
        handleCloseModal();
      });
    },
  });

  async function handleCreateTrial() {
    setTriggeredCreateInfrastucture(true);
    await dispatch(
      createTrial({
        ipAddress: trialState?.ip as string,
      })
    ).then((res: any) => {
      console.log("trial created");
      setTimeout(() => {
        handleReload();
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
              (trialState?.organization &&
                trialState?.roboticsCloud &&
                trialState?.instance)
            }
            onClick={() => handleCreateTrial()}
            loading={
              !trialState?.organization ||
              !trialState?.roboticsCloud ||
              !trialState?.instance
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
              !trialState?.organization ||
              !trialState?.roboticsCloud ||
              !trialState?.instance ||
              trialState?.instance?.instanceCloudState !== "ConnectionHub_Ready"
            }
            loading={formik.isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  );
}
