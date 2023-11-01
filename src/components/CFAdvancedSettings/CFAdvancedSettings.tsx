import CFPersistDirTags from "../CFPersistDirTags/CFPersistDirTags";
import CreateRobotFormGrantedDirectoriesInputTag from "../CreateRobotFormGrantedDirectoriesInputTag/CreateRobotFormGrantedDirectoriesInputTag";
import PortSetter from "../CreateRobotFormPortSetter/CreateRobotFormPortSetter";
import Accordion from "../Accordion/AccordionV2";
import { ReactElement, useState } from "react";
import { FormikProps } from "formik/dist/types";
import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import CFSection from "../CFSection/CFSection";
import Seperator from "../Seperator/Seperator";

interface ICFAdvancedSettings {
  formik: FormikProps<IRobotStep1>;
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
      header={
        <div className="text-xs text-layer-light-900">Advanced Settings</div>
      }
      className="rounded-md !border-layer-light-100 shadow-none"
      isOpen={isOpen}
      handleOpen={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="flex flex-col gap-5 px-4 pb-6 pt-2">
        <CFSection gap={4}>
          <CFPersistDirTags />
          <Seperator />
        </CFSection>

        <CFSection gap={4}>
          <CreateRobotFormGrantedDirectoriesInputTag />
          <Seperator />
        </CFSection>

        <CFSection gap={4}>
          <PortSetter formik={formik} isImportRobot={disabled} type="ide" />
          <Seperator />
        </CFSection>

        <CFSection>
          <PortSetter formik={formik} isImportRobot={disabled} type="vdi" />
        </CFSection>
      </div>
    </Accordion>
  );
}
