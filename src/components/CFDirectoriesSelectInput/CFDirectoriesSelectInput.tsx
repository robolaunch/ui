import { IDetails } from "../../interfaces/robotInterfaces";
import { ReactElement, useEffect, useState } from "react";
import useFunctions from "../../hooks/useFunctions";
import InputError from "../InputError/InputError";
import InfoTip from "../InfoTip/InfoTip";
import { FormikProps } from "formik";
import Select from "react-select";

interface ICFDirectoriesSelectInput {
  type?: "host" | "mount";
  formik: FormikProps<IDetails>;
  index?: number;
  dataTut?: string;
  labelName?: string;
  labelInfoTip?: string;
  rightTip?: boolean;
  classNameContainer?: string;
  classNameInput?: string;
  inputError?: string;
  inputTouched?: boolean;
}

export default function CFDirectoriesSelectInput({
  type,
  formik,
  index,
  dataTut,
  labelName,
  labelInfoTip,
  rightTip,
  classNameContainer,
  classNameInput,
  inputError,
  inputTouched,
}: ICFDirectoriesSelectInput): ReactElement {
  const [selectableItems, setSelectableItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const { getFiles } = useFunctions();

  useEffect(() => {
    console.log("selectableItems", selectableItems);
    console.log("selectedItems", selectedItems);
  }, [selectableItems, selectedItems]);

  useEffect(() => {
    if (type === "host") {
      formik.setFieldValue(
        `hostDirectories.[${index}].hostDirectory`,
        selectedItems?.join(""),
      );
    } else {
      formik.setFieldValue(
        `hostDirectories.[${index}].mountPath`,
        selectedItems?.join(""),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, selectedItems, type]);

  async function handleGetSelectableItems(paths?: string[]) {
    const { items } = await getFiles(paths);

    if (items?.length) {
      setSelectableItems(
        items
          ?.filter((item: any) => item.isDir)
          ?.map((item: any) => `/${item.name}`),
      );
    } else {
      setSelectableItems([]);
      setMenuIsOpen(false);
    }
  }

  return (
    <div data-tut={dataTut} className={classNameContainer}>
      <div
        className={`flex min-w-fit gap-1 pb-3 text-xs font-medium text-light-700 ${classNameInput}`}
      >
        {labelName}
        <InfoTip content={labelInfoTip} rightTip={rightTip} />
      </div>
      <Select
        menuIsOpen={menuIsOpen}
        options={
          selectableItems?.map((item) => ({
            value: item,
            label: selectedItems?.join() + item,
          })) ?? []
        }
        onMenuOpen={() => {
          handleGetSelectableItems(selectedItems);
          setMenuIsOpen(true);
        }}
        onBlur={() => setMenuIsOpen(false)}
        onChange={(selected) => {
          if (selected) {
            setSelectedItems([...selectedItems, selected.value]);
            handleGetSelectableItems([...selectedItems, selected.value]);
            setMenuIsOpen(true);
          } else {
            setSelectedItems([]);
            handleGetSelectableItems();
          }
          console.log(selected);
        }}
        maxMenuHeight={160}
        isSearchable
        isClearable
        className="text-xs"
        classNamePrefix="text-xs"
        placeholder="Select a directory..."
        required
      />
      <InputError error={inputError} touched={inputTouched} />
    </div>
  );
}
