import { CFRobotStep1Validations } from "../../validations/RobotsValidations";
import CFAdvancedSettings from "../CFAdvancedSettings/CFAdvancedSettings";
import { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotTypes from "../CreateRobotTypes/CreateRobotTypes";
import CreateRobotStorage from "../CFStorageRange/CFStorageRange";
import CFBridgeToggle from "../CFBridgeToggle/CFBridgeToggle";
import CFRobotButtons from "../CFRobotButtons/CFRobotButtons";
import { IDetails } from "../../interfaces/robotInterfaces";
import CreateRobotFormLoader from "../CFLoader/CFLoader";
import useCreateRobot from "../../hooks/useCreateRobot";
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
import { useFormik } from "formik";
import { toast } from "sonner";

interface ICFStep1 {
  isImportRobot?: boolean;
}

export default function CFStep1({ isImportRobot }: ICFStep1): ReactElement {
  const { robotData, setRobotData } = useCreateRobot();
  const { selectedState, handleCreateRobotNextStep } = useMain();
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const {
    getRobot,
    addPhysicalInstanceToFleet,
    createRobot: updateRobot,
  } = useFunctions();
  const url = useParams();

  useEffect(() => {
    if (!responseRobot && isImportRobot) {
      handleGetRobot();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGetRobot() {
    getRobot(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId!,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name!,
        robotName: robotData?.step1?.details?.name || url?.robotName!,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseRobot,
        setRobotData: true,
      },
    );
  }

  const formik = useFormik<IDetails>({
    validationSchema: CFRobotStep1Validations,
    initialValues: robotData?.step1,
    onSubmit: async () => {
      formik.setSubmitting(true);

      if (isImportRobot) {
        await updateRobot();

        toast.success(
          "Robot updated successfully. Redirecting to fleet page...",
        );
        setTimeout(() => {
          window.location.href = `/${
            selectedState?.organization?.name?.split("_")[1]
          }/${selectedState?.roboticsCloud?.name}/${
            selectedState?.instance?.name
          }/${selectedState?.fleet?.name}/${robotData?.step1?.details?.name}}`;
        }, 2000);
      } else if (!formik.values?.details?.isVirtualRobot) {
        addPhysicalInstanceToFleet();
      }

      formik.setSubmitting(false);
      handleCreateRobotNextStep();
    },
  });

  useEffect(() => {
    setRobotData({
      ...robotData,
      step1: formik.values,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  useEffect(() => {
    if (formik.values.details.isVirtualRobot) {
      formik.setFieldValue("tree.physicalInstance.name", "");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.details.isVirtualRobot]);

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
            <CFVDICount formik={formik} disabled={isImportRobot} />
            <Seperator />
          </CFSection>

          <CFSection>
            <div className="flex items-center gap-4">
              <CFBridgeToggle formik={formik} isImportRobot={isImportRobot} />
              <CFGPUToggle formik={formik} isImportRobot={isImportRobot} />
            </div>
            <Seperator />
          </CFSection>

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
