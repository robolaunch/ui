import { ReactElement, useState } from "react";
import Accordion from "../Accordion/AccordionV2";
import PersistedDirectoriesInputTag from "../CreateRobotFormPersistedDirectoriesInputTag/CreateRobotFormPersistedDirectoriesInputTag";
import CreateRobotFormGrantedDirectoriesInputTag from "../CreateRobotFormGrantedDirectoriesInputTag/CreateRobotFormGrantedDirectoriesInputTag";
import PortSetter from "../CreateRobotFormPortSetter/CreateRobotFormPortSetter";

interface ICreateRobotFormAdvancedSettings {
  formik: any;
}

export default function CreateRobotFormAdvancedSettings({
  formik,
}: ICreateRobotFormAdvancedSettings): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="mt-4">
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
          <PersistedDirectoriesInputTag />

          <CreateRobotFormGrantedDirectoriesInputTag />

          <PortSetter formik={formik} type="ide" />

          <PortSetter formik={formik} type="vdi" />
        </div>
      </Accordion>
    </div>
  );
}
