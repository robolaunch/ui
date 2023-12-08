import CFHostDirectories from "../CFHostDirectories/CFHostDirectories";
import CFPersistDirTags from "../CFPersistDirTags/CFPersistDirTags";
import CFGrantDirTags from "../CFGrantDirTags/CFGrantDirTags";
import { IDetails } from "../../interfaces/robotInterfaces";
import CFPortSetter from "../CFPortSetter/CFPortSetter";
import Accordion from "../Accordion/AccordionV2";
import { FormikProps } from "formik/dist/types";
import { ReactElement, useState } from "react";
import CFSection from "../CFSection/CFSection";
import Seperator from "../Seperator/Seperator";

interface ICFAdvancedSettings {
  formik: FormikProps<IDetails>;
  disabled?: boolean;
}

export default function CFAdvancedSettings({
  formik,
  disabled,
}: ICFAdvancedSettings): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Accordion
      id={0}
      header={<div className="text-light-900 text-xs">Advanced Settings</div>}
      className="!border-light-100 rounded-md shadow-none"
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
          <CFHostDirectories formik={formik} disabled={disabled} />
          <Seperator />
        </CFSection>

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
