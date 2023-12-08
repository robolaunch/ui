import { ReactElement } from "react";

interface ISidebarInfo {
  text: string;
  component?: ReactElement;
}

export default function SidebarInfo({
  text,
  component,
}: ISidebarInfo): ReactElement {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-2">
      <div className="animate__animated animate__fadeIn text-light-300 text-center text-base font-bold">
        {text}
      </div>
      {component && <div>{component}</div>}
    </div>
  );
}
