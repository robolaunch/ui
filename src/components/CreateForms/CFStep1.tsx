import CFAdvancedSettings from "../CFAdvancedSettings/CFAdvancedSettings";
import { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotTypes from "../CreateRobotTypes/CreateRobotTypes";
import CreateRobotStorage from "../CFStorageRange/CFStorageRange";
import CFBridgeToggle from "../CFBridgeToggle/CFBridgeToggle";
import CFRobotButtons from "../CFRobotButtons/CFRobotButtons";
import CreateRobotFormLoader from "../CFLoader/CFLoader";
import CFRosDistros from "../CFRosDistros/CFRosDistros";
import CFGPUToggle from "../CFGPUToggle/CFGPUToggle";
import CFRobotName from "../CFRobotName/CFRobotName";
import useFunctions from "../../hooks/useFunctions";
import CFVDICount from "../CFVDICount/CFVDICount";
import CFSection from "../CFSection/CFSection";
import Seperator from "../Seperator/Seperator";
import CFDevMode from "../CFDevMode/CFDevMode";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";
import useForm from "../../hooks/useForm";
import CFGpuTypes from "../CFGpuTypes/CFGpuTypes";
import CFGpuCore from "../CFGpuCore/CFGpuCore";

interface ICFStep1 {
  isImportRobot?: boolean;
}

export default function CFStep1({ isImportRobot }: ICFStep1): ReactElement {
  const { robotData, setRobotData } = useMain();
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const { getRobotFC } = useFunctions();
  const url = useParams();

  useEffect(() => {
    if (!responseRobot && isImportRobot) {
      handleGetRobot();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleGetRobot() {
    setResponseRobot(
      await getRobotFC(
        false,
        robotData?.step1?.details?.name || url?.robotName!,
      ),
    );
  }

  const { step1Formik: formik } = useForm();

  useEffect(() => {
    setRobotData({
      ...robotData,
      step1: formik.values,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik?.values]);

  useEffect(() => {
    if (formik.values.details.isVirtualRobot) {
      formik.setFieldValue("tree.physicalInstance.name", "");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik?.values.details.isVirtualRobot]);

  return (
    <Fragment>
      {
        <CreateRobotFormLoader
          type="step1-robot"
          loadingText="Loading..."
          loadingItems={[]}
          isLoading={isImportRobot ? !responseRobot : false}
          formik={formik}
        >
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
            <CreateRobotStorage formik={formik} disabled={isImportRobot} />
            <Seperator />
          </CFSection>

          <CFSection>
            <CFVDICount formik={formik} />
            <Seperator />
          </CFSection>

          <CFSection>
            <div className="flex items-center gap-4">
              <CFBridgeToggle formik={formik} />
              <CFGPUToggle formik={formik} isImportRobot={isImportRobot} />
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
        </CreateRobotFormLoader>
      }
    </Fragment>
  );
}
