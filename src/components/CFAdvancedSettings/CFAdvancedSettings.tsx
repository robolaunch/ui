import CFPersistDirTags from "../CFPersistDirTags/CFPersistDirTags";
import CFDirectories from "../CFHostDirectories/CFHostDirectories";
import CFGrantDirTags from "../CFGrantDirTags/CFGrantDirTags";
import CFPortSetter from "../CFPortSetter/CFPortSetter";
import useCreateRobot from "../../hooks/useCreateRobot";
import Accordion from "../Accordion/AccordionV2";
import { FormikProps } from "formik/dist/types";
import { ReactElement, useState } from "react";
import CFSection from "../CFSection/CFSection";
import Seperator from "../Seperator/Seperator";
import { IEnvironmentStep1 } from "../../interfaces/envitonment.step1.interface";

interface ICFAdvancedSettings {
  formik: FormikProps<IEnvironmentStep1>;
  disabled?: boolean;
}

export default function CFAdvancedSettings({
  formik,
  disabled,
}: ICFAdvancedSettings): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { robotData } = useCreateRobot();

  return (
    <Accordion
      id={0}
      header={<div className="text-xs text-light-900">Advanced Settings</div>}
      className="rounded-md !border-light-100 shadow-none"
      isOpen={isOpen}
      handleOpen={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="flex flex-col gap-8 px-4 pb-6 pt-2">
        <CFSection gap={4}>
          <CFPersistDirTags formik={formik} disabled={disabled} />
          <Seperator />
        </CFSection>

        <CFSection gap={4}>
          <CFGrantDirTags formik={formik} disabled={disabled} />
          <Seperator />
        </CFSection>

        <CFSection gap={4}>
          <CFDirectories formik={formik} disabled={disabled} />
          <Seperator />
        </CFSection>

        {robotData.step1.services.jupyterNotebook.isEnabled && (
          <CFSection gap={4}>
            <CFPortSetter formik={formik} type="jupyterNotebook" />
            <Seperator />
          </CFSection>
        )}

        <CFSection gap={4}>
          <CFPortSetter formik={formik} type="ide" />
          <Seperator />
        </CFSection>

        <CFSection>
          <CFPortSetter formik={formik} type="vdi" />
        </CFSection>
      </div>
    </Accordion>
  );
}
