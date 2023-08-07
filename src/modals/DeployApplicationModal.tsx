import DeployApplicationSelector from "../components/DeployApplicationSelector/DeployApplicationSelector";
import React, { ReactElement, useEffect, useState } from "react";
import { getIP } from "../toolkit/TrialSlice";
import { Dialog } from "primereact/dialog";
import useMain from "../hooks/useMain";

interface IDeployApplication {
  handleCloseModal: () => void;
  item: any;
}

export default function DeployApplication({
  handleCloseModal,
  item,
}: IDeployApplication): ReactElement {
  useState<boolean>(false);
  const { trialState } = useMain();

  useEffect(() => {
    !trialState?.ip && getIP();
  }, [trialState]);

  return (
    <Dialog
      header="Deploy Application"
      visible={true}
      draggable={false}
      className="w-[36vw]"
      onHide={() => handleCloseModal()}
    >
      <DeployApplicationSelector
        item={item}
        handleCloseModal={handleCloseModal}
      />
    </Dialog>
  );
}
