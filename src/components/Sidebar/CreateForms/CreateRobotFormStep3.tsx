import React, { ReactElement, useContext } from "react";
import { SidebarContext } from "../../../contexts/SidebarContext";
import Button from "../../Button/Button";

export default function CreateRobotFormStep3(): ReactElement {
  const {
    handleCreateRobotPreviousStep,
    handleCreateRobotNextStep,
  }: {
    handleCreateRobotPreviousStep: () => void;
    handleCreateRobotNextStep: () => void;
  } = useContext(SidebarContext);

  const formik: any = null;

  return (
    <div>
      <h1>CreateRobotFormStep3</h1>
      <div className="flex gap-4">
        <Button
          onClick={handleCreateRobotPreviousStep}
          type="reset"
          className="!h-11 !bg-layer-light-50 text-primary border border-primary hover:!bg-layer-primary-100 transition-all duration-500"
          text={`Previous Step`}
        />
        <Button
          onClick={handleCreateRobotNextStep}
          type="submit"
          className="!h-11"
          text={`Next Step`}
        />
      </div>
    </div>
  );
}
