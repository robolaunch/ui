import CFHostDirectories2 from "../CFHostDirectories2/CFHostDirectories2";
// import CFDirectories from "../CFHostDirectories/CFHostDirectories";
import CFPersistDirTags from "../CFPersistDirTags/CFPersistDirTags";
import CFGrantDirTags from "../CFGrantDirTags/CFGrantDirTags";
import { IDetails } from "../../interfaces/robotInterfaces";
import CFPortSetter from "../CFPortSetter/CFPortSetter";
import Accordion from "../Accordion/AccordionV2";
import { FormikProps } from "formik/dist/types";
import { ReactElement, useState } from "react";
import CFSection from "../CFSection/CFSection";
import Seperator from "../Seperator/Seperator";
import useCreateRobot from "../../hooks/useCreateRobot";

interface ICFAdvancedSettings {
  formik: FormikProps<IDetails>;
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

        {/* <CFSection gap={4}>
          <CFDirectories formik={formik} disabled={disabled} />
          <Seperator />
        </CFSection> */}

        <CFSection gap={4}>
          <CFHostDirectories2 formik={formik} disabled={disabled} />
          <Seperator />
        </CFSection>

        {robotData.step1.jupyterNotebook.isEnabled && (
          <CFSection gap={4}>
            <CFPortSetter
              formik={formik}
              isImportRobot={disabled}
              type="jupyter-notebook"
            />
            <Seperator />
          </CFSection>
        )}

        <CFSection gap={4}>
          <CFPortSetter formik={formik} isImportRobot={disabled} type="ide" />
          <Seperator />
        </CFSection>

        <CFSection>
          <CFPortSetter formik={formik} isImportRobot={disabled} type="vdi" />
        </CFSection>
      </div>
    </Accordion>
  );
}
