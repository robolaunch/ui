import CFAdvancedSettings from "../CFAdvancedSettings/CFAdvancedSettings";
import CFEnvironmentName from "../CFEnvironmentName/CFEnvironmentName";
import CFJupyterNotebook from "../CFJupyterNotebook/CFJupyterNotebook";
import CFStep1AppButtons from "../CFStep1AppButtons/CFStep1AppButtons";
import CFEnvCategories from "../CFEnvCategories/CFEnvCategories";
import CFStorageRange from "../CFStorageRange/CFStorageRange";
import { Fragment, ReactElement, useEffect } from "react";
import useFunctions from "../../hooks/useFunctions";
import CFGpuTypes from "../CFGpuTypes/CFGpuTypes";
import CFVDICount from "../CFVDICount/CFVDICount";
import Seperator from "../Seperator/Seperator";
import CFSection from "../CFSection/CFSection";
import CFGpuCore from "../CFGpuCore/CFGpuCore";
import CFSharing from "../CFSharing/CFSharing";
import { useParams } from "react-router-dom";
import CFLoader from "../CFLoader/CFLoader";
import useMain from "../../hooks/useMain";
import useForm from "../../hooks/useForm";

interface ICFAppStep1 {
  isImportRobot?: boolean;
}

export default function CFAppStep1({
  isImportRobot = false,
}: ICFAppStep1): ReactElement {
  const { robotData, setRobotData } = useMain();
  const { getApplicationFC } = useFunctions();
  const url = useParams();
  const { step1AppFormik: formik } = useForm();

  useEffect(() => {
    if (!robotData?.step1?.details?.name && isImportRobot) {
      handleGetEnvironment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRobotData({
      ...robotData,
      step1: formik.values,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  async function handleGetEnvironment() {
    await getApplicationFC(!robotData?.step1?.details?.name, url?.robotName!);
  }

  return (
    <CFLoader
      type="step1-app"
      loadingText="Loading..."
      loadingItems={[]}
      isLoading={isImportRobot ? !robotData?.step1?.details?.name : false}
      formik={formik}
    >
      <CFSection>
        <CFEnvironmentName formik={formik} disabled={isImportRobot} />
        <Seperator />
      </CFSection>

      <CFSection>
        <CFEnvCategories formik={formik} disabled={isImportRobot} />
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

      <CFSection>
        <CFVDICount formik={formik} />
        <Seperator />
      </CFSection>

      <CFSection>
        <CFStorageRange formik={formik} disabled={isImportRobot} />
        <Seperator />
      </CFSection>

      {/* <Fragment>
        {!isImportRobot && (
          <CFSection>
            <CFJupyterNotebook formik={formik} />
            <Seperator />
          </CFSection>
        )}
      </Fragment> */}

      {/* <CFSection>
        <CFSharing formik={formik} />
        <Seperator />
      </CFSection> */}

      <CFSection>
        <CFAdvancedSettings formik={formik} disabled={isImportRobot} />
      </CFSection>

      <CFSection>
        <CFStep1AppButtons isImportRobot={isImportRobot} />
      </CFSection>
    </CFLoader>
  );
}
