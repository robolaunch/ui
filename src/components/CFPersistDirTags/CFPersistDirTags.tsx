import { ReactElement, useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { toast } from "sonner";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import useMain from "../../hooks/useMain";

interface ICFPersistDirTags {
  formik: FormikProps<IEnvironmentStep1>;
  disabled?: boolean;
}

export default function CFPersistDirTags({
  formik,
  disabled,
}: ICFPersistDirTags): ReactElement {
  const { robotData } = useMain();

  const [selected, setSelected] = useState<string[]>(
    robotData.step1.directories.persistentDirectories?.split(":") || [
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
    formik.setFieldValue(
      "directories.persistentDirectories",
      selected.join(":"),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <CFInfoBar
      label="Persistent Directories:"
      tip="Here you can persist directorys on the application."
      vertical
    >
      <TagsInput
        value={selected}
        onChange={(tags) => setSelected(tags)}
        name="persistent directories"
        classNames={{
          input: "!text-xs disabled:cursor-not-allowed",
          tag: "!text-xs !bg-light-50 border border-light-200",
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
        disabled={disabled}
      />
    </CFInfoBar>
  );
}
