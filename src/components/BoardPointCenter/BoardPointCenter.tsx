import { Tooltip } from "@nextui-org/react";
import { ReactElement } from "react";
import BoardPointToolTipContent from "../BoardPointToolTipContent/BoardPointToolTipContent";
import { BsArrowsMove } from "react-icons/bs";

export default function BoardPointCenter(): ReactElement {
  const size = 16;

  return (
    <Tooltip content={<BoardPointToolTipContent type="center" />}>
      <div
        className="absolute "
        style={{
          left: size / -4,
          bottom: size / -4,
          zIndex: 50,
        }}
      >
        <BsArrowsMove className="text-red-700" size={size} />
      </div>
    </Tooltip>
  );
}
