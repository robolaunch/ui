import { Fragment, ReactElement } from "react";
import { RxOpenInNewWindow } from "react-icons/rx";

interface IConnectionLabel {
  label: string;
  url: string;
}

export default function ConnectionLabel({
  label,
  url,
}: IConnectionLabel): ReactElement {
  return (
    <Fragment>
      {!url ? (
        <span className="text-xs font-semibold">{label}:</span>
      ) : (
        <a className="flex gap-1" href={url} target="_blank" rel="noreferrer">
          <RxOpenInNewWindow size={14} />
          <span className="text-xs font-semibold">{label}:</span>
        </a>
      )}
    </Fragment>
  );
}
