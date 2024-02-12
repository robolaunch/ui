import { Fragment, ReactElement, useState } from "react";
import { IoSearch } from "react-icons/io5";
import IframeModal from "../../modals/IframeModal";
import useMain from "../../hooks/useMain";

export default function HostDirectoriesSearchIframe(): ReactElement {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { selectedState } = useMain();

  function handleGenerateURL() {
    if (window.location.hostname.split(".").length - 1) {
      const url = window.location.hostname.split(".").slice(1).join(".");

      return url;
    }
    return window.location.hostname;
  }

  return (
    <Fragment>
      <div className="cursor-pointer" onClick={() => setIsOpened(true)}>
        <IoSearch className="text-light-500" size={16} />
      </div>
      {isOpened && (
        <IframeModal
          header="Host Directories Search"
          handleCloseModal={() => setIsOpened(false)}
          url={
            selectedState?.instance?.endpoint
              ? `https://${selectedState?.instance?.endpoint!}/host`
              : `https://${selectedState?.instance?.name}.${handleGenerateURL()}/host`
          }
        />
      )}
    </Fragment>
  );
}
