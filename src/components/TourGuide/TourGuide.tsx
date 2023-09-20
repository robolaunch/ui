import React, { Fragment, ReactElement, useState } from "react";
import {
  setIsShowedCreateRobotStep1Guide,
  setIsShowedCreateRobotStep2Guide,
  setIsShowedCreateRobotStep3Guide,
  setIsShowedCreateRobotStep4Guide,
  setIsShowedFleetGuide,
  setIsShowedInstanceGuide,
  setIsShowedMainGuide,
  setIsShowedOrganizationGuide,
  setIsShowedRobotGuide,
  setIsShowedRoboticsCloudGuide,
} from "../../toolkit/GuideSlice";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Button from "../Button/Button";
import Tour from "reactour";

interface ITourGuide {
  type:
    | "main"
    | "organization"
    | "roboticscloud"
    | "instance"
    | "fleet"
    | "robot"
    | "createRobotStep1"
    | "createRobotStep2"
    | "createRobotStep3"
    | "createRobotStep4";
  tourConfig: any[];
  hiddenButton?: boolean;
}

export default function TourGuide({
  type,
  tourConfig,
  hiddenButton,
}: ITourGuide): ReactElement {
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const {
    isShowedMainGuide,
    isShowedOrganizationGuide,
    isShowedRoboticsCloudGuide,
    isShowedInstanceGuide,
    isShowedFleetGuide,
    isShowedRobotGuide,
    isShowedCreateRobotStep1Guide,
    isShowedCreateRobotStep2Guide,
    isShowedCreateRobotStep3Guide,
    isShowedCreateRobotStep4Guide,
  } = useAppSelector((state) => state.guide);

  const handleIsOpen = () => {
    switch (type) {
      case "main":
        return !isShowedMainGuide || isTourOpen;
      case "organization":
        return !isShowedOrganizationGuide || isTourOpen;
      case "roboticscloud":
        return !isShowedRoboticsCloudGuide || isTourOpen;
      case "instance":
        return !isShowedInstanceGuide || isTourOpen;
      case "fleet":
        return !isShowedFleetGuide || isTourOpen;
      case "robot":
        return !isShowedRobotGuide || isTourOpen;
      case "createRobotStep1":
        return !isShowedCreateRobotStep1Guide || isTourOpen;
      case "createRobotStep2":
        return !isShowedCreateRobotStep2Guide || isTourOpen;
      case "createRobotStep3":
        return !isShowedCreateRobotStep3Guide || isTourOpen;
      case "createRobotStep4":
        return !isShowedCreateRobotStep4Guide || isTourOpen;

      default:
        return isTourOpen;
    }
  };

  function handleCloseGuide() {
    setIsTourOpen(false);

    switch (type) {
      case "main":
        return dispatch(setIsShowedMainGuide());
      case "organization":
        return dispatch(setIsShowedOrganizationGuide());
      case "roboticscloud":
        return dispatch(setIsShowedRoboticsCloudGuide());
      case "instance":
        return dispatch(setIsShowedInstanceGuide());
      case "fleet":
        return dispatch(setIsShowedFleetGuide());
      case "robot":
        return dispatch(setIsShowedRobotGuide());
      case "createRobotStep1":
        return dispatch(setIsShowedCreateRobotStep1Guide());
      case "createRobotStep2":
        return dispatch(setIsShowedCreateRobotStep2Guide());
      case "createRobotStep3":
        return dispatch(setIsShowedCreateRobotStep3Guide());
      case "createRobotStep4":
        return dispatch(setIsShowedCreateRobotStep4Guide());
    }
  }

  return (
    <Fragment>
      {!hiddenButton && (
        <Button
          text="Show Guide"
          className="!w-48 !h-10 !text-xs"
          onClick={() => {
            setIsTourOpen(true);
          }}
        />
      )}
      <Tour
        onRequestClose={handleCloseGuide}
        steps={tourConfig}
        isOpen={handleIsOpen()}
        showNumber={false}
        maskClassName="opacity-50"
        className="!p-10 text-sm !bg-primary !text-white"
        rounded={5}
        accentColor={"#FFFFFF"}
        prevButton={
          <FiArrowLeft className="text-white hover:text-layer-primary-200 scale-150 transition-500" />
        }
        nextButton={
          <FiArrowRight className="text-white hover:text-layer-primary-200 scale-150 transition-500" />
        }
        onAfterOpen={(target: any) => disableBodyScroll(target)}
        onBeforeClose={(target: any) => enableBodyScroll(target)}
      />
    </Fragment>
  );
}
