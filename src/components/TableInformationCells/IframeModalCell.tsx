import { ReactElement, useState } from "react";
import IframeModal from "../../modals/IframeModal";

interface IIframeModalCell {
  text: string | number;
  url: string;
}

export default function IframeModalCell({
  text,
  url,
}: IIframeModalCell): ReactElement {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  return (
    <button>
      <p
        className="transition-300 px-2 text-xs underline  hover:text-primary-400"
        onClick={() => setIsOpenedModal(true)}
      >
        {text}
      </p>
      {isOpenedModal && (
        <IframeModal
          url={url}
          header={"Service"}
          handleCloseModal={() => setIsOpenedModal(false)}
        />
      )}
    </button>
  );
}
