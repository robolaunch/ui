import React, { Fragment, ReactElement, useState } from "react";
import {
  setIsShowedFleetGuide,
  setIsShowedInstanceGuide,
  setIsShowedMainGuide,
  setIsShowedOrganizationGuide,
  setIsShowedRoboticsCloudGuide,
} from "../../toolkit/GuideSlice";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Button from "../Button/Button";
import Tour from "reactour";

interface ITourGuide {
  type: "main" | "organization" | "roboticscloud" | "instance" | "fleet";
  tourConfig: any[];
}

export default function TourGuide({
  type,
  tourConfig,
}: ITourGuide): ReactElement {
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const {
    isShowedMainGuide,
    isShowedOrganizationGuide,
    isShowedRoboticsCloudGuide,
    isShowedInstanceGuide,
    isShowedFleetGuide,
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
    }
  }

  return (
    <Fragment>
      <Button
        text="Show Guide"
        className="!w-48 !h-10 !text-xs"
        onClick={() => {
          setIsTourOpen(true);
        }}
      />
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
