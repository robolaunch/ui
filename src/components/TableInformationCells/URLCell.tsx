import { ReactElement } from "react";

interface IURLCell {
  text: string | number;
  url: string;
  target?: string;
}

export default function URLCell({ text, url, target }: IURLCell): ReactElement {
  return (
    <a href={url} target={target}>
      <p className="transition-300 px-2 text-xs underline  hover:text-primary-400">
        {text}
      </p>
    </a>
  );
}
