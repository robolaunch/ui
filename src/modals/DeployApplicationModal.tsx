import {
  handleGetRandomString,
  organizationNameViewer,
} from "../functions/GeneralFunctions";
import { createRobot } from "../toolkit/RobotSlice";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import useSidebar from "../hooks/useSidebar";
import React, { ReactElement } from "react";
import { Dialog } from "primereact/dialog";
import useTrial from "../hooks/useTrial";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

interface IDeployApplication {
  handleCloseModal: () => void;
  item: any;
}

export default function DeployApplication({
  handleCloseModal,
  item,
}: IDeployApplication): ReactElement {
  const { selectedState } = useSidebar();
  const { trialState } = useTrial();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
          robotName: handleGetRandomString(10),
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
              workspaceDistro: item?.distro.toUpperCase(),
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
            organizationName: selectedState?.organization?.organizationName,
            capitalization: false,
          })}/${selectedState?.roboticsCloud?.name}/${
            selectedState?.instance?.name
          }/${selectedState?.fleet?.name}/`
        );
        handleCloseModal();
      });
    },
  });

  return (
    <Dialog
      header="Deploy Application"
      visible={true}
      draggable={false}
      className="w-[30vw]"
      onHide={() => handleCloseModal()}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-6"
      >
        <p className="text-sm">
          You are about to deploy the application <b>{item?.name}</b> to your
          fleet <b>{trialState?.fleet?.name}</b>. Please confirm this action.
        </p>
        <div className="flex justify-end items-center gap-4">
          <Button
            className="!w-56 !h-11"
            type="submit"
            text="Deploy Application"
            disabled={formik.isSubmitting || !formik.isValid}
            loading={formik.isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  );
}
