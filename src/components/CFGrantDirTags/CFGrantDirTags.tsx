import { IDetails } from "../../interfaces/robotInterfaces";
import { ReactElement, useEffect, useState } from "react";
import useCreateRobot from "../../hooks/useCreateRobot";
import { TagsInput } from "react-tag-input-component";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { toast } from "sonner";

interface ICFGrantDirTag {
  formik: FormikProps<IDetails>;
  disabled?: boolean;
}

export default function CFGrantDirTag({
  formik,
  disabled,
}: ICFGrantDirTag): ReactElement {
  const { robotData } = useCreateRobot();

  const [selected, setSelected] = useState<string[]>(
    robotData.step1.directories.permittedDirectories.split(":") || [
      "/home/robolaunch",
    ],
  );

  useEffect(() => {
    if (!selected.includes("/home/robolaunch")) {
      formik.setFieldValue(
        "directories.permittedDirectories",
        [...selected, "/home/robolaunch"].join(":"),
      );

      setSelected([...selected, "/home/robolaunch"]);
      return;
    }

    formik.setFieldValue(
      "directories.permittedDirectories",
      selected.join(":"),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <CFInfoBar
      label="Granted Directories:"
      tip="Here you can specify the directories that the user needs to access."
      vertical
    >
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="Granted directories"
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
          if (tag === "/home/robolaunch") {
            toast.error("Cannot remove this path");
            return false;
          }
        }}
        disabled={disabled}
      />
    </CFInfoBar>
  );
}
