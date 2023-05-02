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
      className="relative cursor-pointer p-0 m-0"
      style={{
        width: size || 16,
      }}
      onClick={() => setIsHover(!isHover)}
    >
      {isHover && content && (
        <div
          className={`absolute top-1 p-2 text-[0.66rem] rounded w-64 text-white z-50 border border-layer-light-500 animate__animated animate__fadeIn ${
            rightTip ? "right-5" : "left-5"
          }`}
          style={{
            backgroundColor: "#000000cc",
          }}
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
