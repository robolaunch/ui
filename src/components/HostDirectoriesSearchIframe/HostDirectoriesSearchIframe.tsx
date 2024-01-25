import { Fragment, ReactElement, useState } from "react";
import { IoSearch } from "react-icons/io5";
import IframeModal from "../../modals/IframeModal";
import useMain from "../../hooks/useMain";

export default function HostDirectoriesSearchIframe(): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { selectedState } = useMain();

  return (
    <Fragment>
      <button onClick={() => setIsOpened(true)}>
        <IoSearch className="text-light-500" size={16} />
      </button>
      {isOpened && (
        <IframeModal
          handleCloseModal={() => setIsOpened(false)}
          url={`https://${selectedState?.instance?.hostname!}/host`}
        />
      )}
    </Fragment>
  );
}
