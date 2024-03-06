import CreateRobotTypes from "../CreateRobotTypes/CreateRobotTypes";
import CFBridgeDistro from "../CFBridgeDistro/CFBridgeDistro";
import CFContainers from "../CFContainers/CFContainers";
import CFRobotName from "../CFRobotName/CFRobotName";
import CFVolumes from "../CFVolumes/CFVolumes";
import Seperator from "../Seperator/Seperator";
import CFSection from "../CFSection/CFSection";
import { Fragment, ReactElement } from "react";
import useForm from "../../hooks/useForm";
import CFRobotButtons from "../CFRobotButtons/CFRobotButtons";

interface ICFStep1Deploy {
  isImportRobot?: boolean;
}

export default function CFStep1Deploy({
  isImportRobot,
}: ICFStep1Deploy): ReactElement {
  const { step1Formik: formik } = useForm();

  return (
    <Fragment>
      <CFSection>
        <CFRobotName formik={formik} isImportRobot={isImportRobot} />
        <Seperator />
      </CFSection>
      <CFSection>
        <CreateRobotTypes
          formik={formik}
          isImportRobot={isImportRobot}
          isDeployMode
        />
        <Seperator />
      </CFSection>
      <CFSection>
        <CFBridgeDistro formik={formik} />
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
        <CFRobotButtons
          formik={formik}
          step={"1-deploy"}
          isImportRobot={isImportRobot}
        />
      </CFSection>
    </Fragment>
  );
}
