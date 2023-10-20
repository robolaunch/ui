import React, { ReactElement, useEffect, useState } from "react";
import InfoTip from "../InfoTip/InfoTip";
import { TagsInput } from "react-tag-input-component";
import { toast } from "sonner";
import useCreateRobot from "../../hooks/useCreateRobot";

export default function GrantedDirectoriesInputTag(): ReactElement {
  const { robotData, setRobotData } = useCreateRobot();

  const [selected, setSelected] = useState<string[]>(
    robotData.step1.permittedDirectories.split(":") || ["/home/robolaunch"],
  );

  useEffect(() => {
    if (!selected.includes("/home/robolaunch")) {
      setRobotData({
        ...robotData,
        step1: {
          ...robotData.step1,
          permittedDirectories: [...selected, "/home/robolaunch"].join(":"),
        },
      });
      setSelected([...selected, "/home/robolaunch"]);
      return;
    }

    setRobotData({
      ...robotData,
      step1: {
        ...robotData.step1,
        permittedDirectories: selected.join(":"),
      },
    });
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
            input: "!text-xs",
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
        />
      </div>
    </div>
  );
}
