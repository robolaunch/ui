import FileBrowserModal from "../../modals/FileBrowserModal";
import { ReactElement, useState } from "react";
import { RiFolder3Line } from "react-icons/ri";

interface IFileBrowser {
  type: "vdi" | "ide";
}

export default function FileBrowser({ type }: IFileBrowser): ReactElement {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <button className="flex cursor-pointer flex-col items-center gap-1 text-light-700 transition-all duration-200 hover:scale-90 hover:text-primary-400">
      <RiFolder3Line size={16} onClick={() => setIsOpenedModal(true)} />
      <p className="whitespace-nowrap text-[0.62rem]">File Manager</p>
      {isOpenedModal && (
        <FileBrowserModal
          type={type}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
