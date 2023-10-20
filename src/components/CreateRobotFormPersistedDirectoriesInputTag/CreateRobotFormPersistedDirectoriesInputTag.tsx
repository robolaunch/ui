import React, { ReactElement, useEffect, useState } from "react";
import InfoTip from "../InfoTip/InfoTip";
import { TagsInput } from "react-tag-input-component";
import { toast } from "sonner";
import useCreateRobot from "../../hooks/useCreateRobot";

export default function PersistedDirectoriesInputTag(): ReactElement {
  const { robotData, setRobotData } = useCreateRobot();

  const [selected, setSelected] = useState<string[]>(
    robotData.step1.persistentDirectories.split(":") || [
      "/var",
      "/etc",
      "/opt",
      "/usr",
    ],
  );

  useEffect(() => {
    if (!selected.includes("/var")) {
      setSelected([...selected, "/var"]);
      return;
    }
    if (!selected.includes("/etc")) {
      setSelected([...selected, "/etc"]);
      return;
    }
    if (!selected.includes("/opt")) {
      setSelected([...selected, "/opt"]);
      return;
    }
    if (!selected.includes("/usr")) {
      setSelected([...selected, "/usr"]);
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    setRobotData({
      ...robotData,
      step1: {
        ...robotData.step1,
        persistentDirectories: selected.join(":"),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div>
      <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700">
        Persistent Directories:
        <InfoTip content="Type a persistent directories." />
      </div>

      <div>
        <TagsInput
          value={selected}
          onChange={setSelected}
          name="persistent directories"
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
            if (
              tag === "/var" ||
              tag === "/etc" ||
              tag === "/opt" ||
              tag === "/usr"
            ) {
              toast.error("Cannot remove this path");

              return false;
            }
          }}
        />
      </div>
    </div>
  );
}
