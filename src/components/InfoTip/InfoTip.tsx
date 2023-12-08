import { ReactElement, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface IInfoTip {
  size?: number;
  content?: string;
  rightTip?: boolean;
}

export default function InfoTip({
  size,
  content,
  rightTip,
}: IInfoTip): ReactElement {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div
      className="relative m-0 cursor-pointer p-0"
      style={{
        width: size || 16,
      }}
      onClick={() => setIsHover(!isHover)}
    >
      {isHover && content && (
        <div
          className={`animate__animated animate__fadeIn border-light-500  text-light-100 bg-light-500 absolute top-1 z-50 flex rounded border p-2 text-[0.66rem] opacity-90 ${
            rightTip ? "right-5" : "left-5"
          } ${content?.length > 42 ? "w-64" : "w-max"}`}
        >
          {content}
        </div>
      )}
      <AiOutlineInfoCircle
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        size={size || 16}
      />
    </div>
  );
}
