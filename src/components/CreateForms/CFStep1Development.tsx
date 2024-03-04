import { Fragment, ReactElement } from "react";
import CFSection from "../CFSection/CFSection";
import CFRobotName from "../CFRobotName/CFRobotName";
import CFBridgeToggle from "../CFBridgeToggle/CFBridgeToggle";
import Seperator from "../Seperator/Seperator";
import CFGpuTypes from "../CFGpuTypes/CFGpuTypes";
import CFRobotButtons from "../CFRobotButtons/CFRobotButtons";
import CFAdvancedSettings from "../CFAdvancedSettings/CFAdvancedSettings";
import CFDevMode from "../CFDevMode/CFDevMode";
import CFGpuCore from "../CFGpuCore/CFGpuCore";
import CFVDICount from "../CFVDICount/CFVDICount";
import CFRosDistros from "../CFRosDistros/CFRosDistros";
import CreateRobotTypes from "../CreateRobotTypes/CreateRobotTypes";
import useForm from "../../hooks/useForm";
import CFStorageRange from "../CFStorageRange/CFStorageRange";
import useMain from "../../hooks/useMain";

interface ICFStep1Development {
  isImportRobot?: boolean;
}

export default function CFStep1Development({
  isImportRobot,
}: ICFStep1Development): ReactElement {
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
        <CFRosDistros formik={formik} isImportRobot={isImportRobot} />
        <Seperator />
      </CFSection>

      <CFSection>
        <CFStorageRange formik={formik} disabled={isImportRobot} />
        <Seperator />
      </CFSection>

      <CFSection>
        <CFVDICount formik={formik} />
        <Seperator />
      </CFSection>

      <CFSection>
        <div className="flex items-center gap-4">
          <CFBridgeToggle formik={formik} />
          {/* <CFGPUToggle formik={formik} isImportRobot={isImportRobot} /> */}
        </div>
        <Seperator />
      </CFSection>

      <CFSection>
        <CFGpuTypes formik={formik} disabled={isImportRobot} />
        <Seperator />
      </CFSection>

      <Fragment>
        {robotData.step1.services.ide.gpuModelName && (
          <CFSection>
            <CFGpuCore formik={formik} />
            <Seperator />
          </CFSection>
        )}
      </Fragment>

      <Fragment>
        {!isImportRobot && (
          <CFSection>
            <CFDevMode formik={formik} isImportRobot={isImportRobot} />
            <Seperator />
          </CFSection>
        )}
      </Fragment>

      <CFSection>
        <CFAdvancedSettings formik={formik} disabled={isImportRobot} />
      </CFSection>

      <CFSection>
        <CFRobotButtons
          formik={formik}
          step={1}
          isImportRobot={isImportRobot}
        />
      </CFSection>
    </Fragment>
  );
}
