import { ReactElement, useEffect, useState } from "react";
import useFunctions from "../../hooks/useFunctions";
import Select from "react-select";

export default function CFHostDirectories(): ReactElement {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [selectableItems, setSelectableItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { getFiles } = useFunctions();

  useEffect(() => {
    handleGetSelectableItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("selectableItems", selectableItems);
    console.log("selectedItems", selectedItems);
  }, [selectableItems, selectedItems]);

  async function handleGetSelectableItems(paths?: string[]) {
    const { items } = await getFiles(paths || []);

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
    <>
      <Select
        menuIsOpen={menuIsOpen}
        options={
          selectableItems?.map((item) => ({
            value: item,
            label: selectedItems?.join("") || item,
          })) || []
        }
        onChange={(e) => {
          if (e) {
            handleGetSelectableItems([...selectedItems, e.value]);
            setSelectedItems([...selectedItems, e.value]);
          }
        }}
        onFocus={() => setMenuIsOpen(true)}
        onBlur={() => setMenuIsOpen(false)}
        value={{
          value: selectedItems?.join("") || "",
          label: selectedItems?.join("") || "",
        }}
        isClearable
      />
    </>
  );
}
