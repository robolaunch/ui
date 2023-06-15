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
          className={`absolute top-1 flex  p-2 text-[0.66rem] rounded text-layer-light-100 z-50 border border-layer-light-500 bg-layer-dark-500 opacity-90 animate__animated animate__fadeIn ${
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
