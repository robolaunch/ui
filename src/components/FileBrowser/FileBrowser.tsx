import FileBrowserModal from "../../modals/FileBrowserModal";
import { ReactElement, useState } from "react";
import { RiFolder3Fill } from "react-icons/ri";

interface IFileBrowser {
  type: "vdi" | "ide";
}

export default function FileBrowser({ type }: IFileBrowser): ReactElement {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <button className="flex cursor-pointer flex-col items-center gap-1 text-light-700 transition-all duration-200 hover:scale-90 hover:text-primary-400">
      <RiFolder3Fill size={20} onClick={() => setIsOpenedModal(true)} />
      <p className="text-[0.66rem]">File Manager</p>
      {isOpenedModal && (
        <FileBrowserModal
          type={type}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
