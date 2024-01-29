import { ReactElement, useEffect, useState } from "react";
import useFunctions from "../../hooks/useFunctions";
import InputError from "../InputError/InputError";
import InfoTip from "../InfoTip/InfoTip";
import { FormikProps } from "formik";
import Select from "react-select";
import useMain from "../../hooks/useMain";
import { IEnvironmentStep1 } from "../../interfaces/envitonment.step1.interface";

interface ICFDirectoriesSelectInput {
  formik: FormikProps<IEnvironmentStep1>;
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
  const [selectableItems, setSelectableItems] = useState<string[] | null>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const { getFilesFromFileManager } = useFunctions();

  useEffect(() => {
    formik.setFieldValue(
      `directories.hostDirectories.[${index}].hostDirectory`,
      selectedItems?.join(""),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, selectedItems]);

  const { selectedState } = useMain();

  async function handleGetSelectableItems(paths?: string[]) {
    setSelectableItems(null);
    const { items } = await getFilesFromFileManager({
      instanceIP: `https://${selectedState?.instance?.endpoint!}/host`,
      paths: paths,
    });

    if (items?.length) {
      const filteredItems = items
        ?.filter((item: any) => item.isDir)
        ?.map((item: any) => `/${item.name}`);

      setSelectableItems(filteredItems);
    } else {
      setSelectableItems([]);
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
            label: selectedItems?.join("") + item,
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
            setSelectableItems([]);
            handleGetSelectableItems([...selectedItems, selected.value]);
            setMenuIsOpen(true);
          } else {
            setSelectedItems([]);
            handleGetSelectableItems();
          }
        }}
        maxMenuHeight={160}
        isSearchable
        isClearable
        className="text-xs"
        classNamePrefix="text-xs"
        placeholder="Select a directory..."
        required
        isLoading={!selectableItems}
      />
      <InputError error={inputError} touched={inputTouched} />
    </div>
  );
}
