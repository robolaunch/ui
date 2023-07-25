import { useFormik } from "formik";
import { Dialog } from "primereact/dialog";
import React, { ReactElement } from "react";
import Button from "../components/Button/Button";
import { useAppDispatch } from "../hooks/redux";
import { createRobot } from "../toolkit/RobotSlice";
import useTrial from "../hooks/useTrial";
import { handleGetRandomString } from "../functions/GeneralFunctions";

interface IImportRobotModal {
  handleCloseModal: () => void;
  item: any;
}

export default function ImportRobotModal({
  handleCloseModal,
  item,
}: IImportRobotModal): ReactElement {
  const { trialState } = useTrial();
  const dispatch = useAppDispatch();

  console.log(item);

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
      );

      handleCloseModal();
    },
  });

  return (
    <Dialog
      header="Import Robot"
      visible={true}
      draggable={false}
      className="w-[30vw]"
      onHide={() => handleCloseModal()}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-6"
      >
        <p className="text-sm">content</p>

        <div className="flex justify-end items-center gap-4">
          <Button
            className="!w-56 !h-11"
            type="submit"
            text="Import Robot"
            disabled={formik.isSubmitting || !formik.isValid}
          />
        </div>
      </form>
    </Dialog>
  );
}
