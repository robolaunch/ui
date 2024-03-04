import CFRobotName from "../CFRobotName/CFRobotName";
import CFVolumes from "../CFVolumes/CFVolumes";
import Seperator from "../Seperator/Seperator";
import CFSection from "../CFSection/CFSection";
import { Fragment, ReactElement } from "react";
import useForm from "../../hooks/useForm";
import useMain from "../../hooks/useMain";
import CFContainers from "../CFContainers/CFContainers";
import CreateRobotTypes from "../CreateRobotTypes/CreateRobotTypes";
import CFBridgeToggle from "../CFBridgeToggle/CFBridgeToggle";

interface ICFStep1Deploy {
  isImportRobot?: boolean;
}

export default function CFStep1Deploy({
  isImportRobot,
}: ICFStep1Deploy): ReactElement {
  const { robotData } = useMain();
  const { step1Formik: formik } = useForm();

  return (
    <Fragment>
      <CFSection>
        <CFRobotName formik={formik} isImportRobot={isImportRobot} />
        <Seperator />
      </CFSection>
      <CFSection>
        <CreateRobotTypes formik={formik} isImportRobot={isImportRobot} />
        <Seperator />
      </CFSection>
      <CFSection>
        <CFVolumes formik={formik} isImportRobot={isImportRobot} />
        <Seperator />
      </CFSection>
      <CFSection>
        <CFContainers formik={formik} isImportRobot={isImportRobot} />
        <Seperator />
      </CFSection>
      <CFSection>
        <CFBridgeToggle formik={formik} />
        <Seperator />
      </CFSection>
    </Fragment>
  );
}
