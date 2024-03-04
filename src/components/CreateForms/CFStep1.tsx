import { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotFormLoader from "../CFLoader/CFLoader";
import useFunctions from "../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";
import useForm from "../../hooks/useForm";
import CFStep1Deploy from "./CFStep1Deploy";
import CFStep1Development from "./CFStep1Development";

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
      <CreateRobotFormLoader
        type="step1-robot-development"
        loadingText="Loading..."
        loadingItems={[]}
        isLoading={isImportRobot ? !responseRobot : false}
        formik={formik}
      >
        {robotData?.step1?.details?.isDeployMode ? (
          <CFStep1Deploy isImportRobot={isImportRobot} />
        ) : (
          <CFStep1Development isImportRobot={isImportRobot} />
        )}
      </CreateRobotFormLoader>
    </Fragment>
  );
}
