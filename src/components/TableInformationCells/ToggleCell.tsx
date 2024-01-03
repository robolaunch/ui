import { Fragment, ReactElement } from "react";
import Toggle from "react-toggle";

interface IToggleCell {
  isChecked: boolean;
  loading?: boolean;
  disabled?: boolean;
  onOpenHandle?: () => void;
  onCloseHandle?: () => void;
}

export default function ToggleCell({
  isChecked,
  loading,
  disabled,
  onOpenHandle,
  onCloseHandle,
}: IToggleCell): ReactElement {
  return (
    <Fragment>
      {loading ? (
        <img
          className="h-10 w-10"
          src="/svg/general/loading.svg"
          alt="loading"
        />
      ) : (
        <Toggle
          className={`toggle-color`}
          onChange={(e) => {
            if (e.target.checked) {
              onOpenHandle && onOpenHandle();
            } else {
              onCloseHandle && onCloseHandle();
            }
          }}
          disabled={disabled}
          defaultChecked={isChecked || false}
        />
      )}
    </Fragment>
  );
}
