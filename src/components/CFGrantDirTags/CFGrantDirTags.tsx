import React, { ReactElement, useEffect, useState } from "react";
import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import useCreateRobot from "../../hooks/useCreateRobot";
import { TagsInput } from "react-tag-input-component";
import { FormikProps } from "formik/dist/types";
import InfoTip from "../InfoTip/InfoTip";
import { toast } from "sonner";

interface ICFGrantDirTag {
  formik: FormikProps<IRobotStep1>;
  disabled?: boolean;
}

export default function CFGrantDirTag({
  formik,
  disabled,
}: ICFGrantDirTag): ReactElement {
  const { robotData } = useCreateRobot();

  const [selected, setSelected] = useState<string[]>(
    robotData.step1.permittedDirectories.split(":") || ["/home/robolaunch"],
  );

  useEffect(() => {
    if (!selected.includes("/home/robolaunch")) {
      formik.setFieldValue(
        "permittedDirectories",
        [...selected, "/home/robolaunch"].join(":"),
      );

      setSelected([...selected, "/home/robolaunch"]);
      return;
    }

    formik.setFieldValue("permittedDirectories", selected.join(":"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div>
      <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700">
        Granted Directories:
        <InfoTip content="Type a granted directories." />
      </div>

      <div>
        <TagsInput
          value={selected}
          onChange={setSelected}
          name="Granted directories"
          classNames={{
            input: "!text-xs disabled:cursor-not-allowed",
            tag: "!text-xs !bg-layer-light-50 border border-layer-light-200",
          }}
          placeHolder="enter a path"
          beforeAddValidate={(tag) => {
            if (tag.charAt(0) !== "/") {
              toast.error("Path must start with '/'");
              return false;
            }
            return true;
          }}
          onRemoved={(tag) => {
            if (tag === "/home/robolaunch") {
              toast.error("Cannot remove this path");
              return false;
            }
          }}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
