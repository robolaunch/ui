import React, { useState } from "react";
const cn = (...args: any[]) => args.filter(Boolean).join(" ");

const SampleSplitter = ({
  id = "drag-bar",
  dir,
  isDragging,
  ...props
}: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      id={id}
      data-testid={id}
      tabIndex={0}
      className={cn(
        "sample-drag-bar ",

        dir === "horizontal" && "sample-drag-bar--horizontal",
        (isDragging || isFocused) && "sample-drag-bar--dragging"
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

export default SampleSplitter;
