import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotFormStep4 from "../CreateForms/CreateRobotFormStep4";
import useFunctions from "../../hooks/useFunctions";
import { useParams } from "react-router-dom";

interface ILaunchUpdateForm {
  reload: boolean;
  setItemCount: any;
}

export default function LaunchUpdateForm({
  reload,
  setItemCount,
}: ILaunchUpdateForm): ReactElement {
  const [responseRobotLaunchManagers, setResponseRobotLaunchManagers] =
    useState<any>(undefined);
  const { handleSetterResponseLaunchManagers } = useFunctions();
  const url = useParams();

  useEffect(() => {
    handleSetterResponseLaunchManagers(
      url?.robotName,
      setResponseRobotLaunchManagers
    );
  }, []);

  return (
    <Fragment>
      {!responseRobotLaunchManagers ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : (
        <CreateRobotFormStep4 isImportRobot />
      )}
    </Fragment>
  );
}
