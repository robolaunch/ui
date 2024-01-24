import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface IIconInfoCell {
  title: string;
  titleURL?: string;
  iconHref?: string;
  subtitle?: string;
  onClick?: () => void;
}

export default function IconInfoCell({
  title,
  titleURL,
  iconHref,
  subtitle,
  onClick,
}: IIconInfoCell): ReactElement {
  const iconComponent = (
    <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold uppercase">
      <img className="h-8 w-8" src={iconHref} alt={iconHref} />
    </div>
  );

  const titleComponent = <span className="text-sm font-semibold">{title}</span>;

  return (
    <div className="flex items-center gap-2.5">
      {onClick ? (
        <div className="cursor-pointer" onClick={() => onClick && onClick()}>
          {iconComponent}
        </div>
      ) : titleURL ? (
        <Link to={titleURL ? titleURL : "#"}>{iconComponent}</Link>
      ) : (
        <span className="cursor-default">{iconComponent}</span>
      )}
      <div className="flex flex-col">
        {onClick ? (
          <div className="cursor-pointer" onClick={() => onClick && onClick()}>
            {titleComponent}
          </div>
        ) : titleURL ? (
          <Link to={titleURL ? titleURL : "#"}>{titleComponent}</Link>
        ) : (
          <span className="cursor-default">{titleComponent}</span>
        )}
        {subtitle && <span className="text-xs">{subtitle}</span>}
      </div>
    </div>
  );
}
