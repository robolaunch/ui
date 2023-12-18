import { ReactNode, useState, useRef, useEffect, useCallback } from "react";
import "./style.css";

interface Props {
  source: ReactNode;
  content: ReactNode;
  startPosition?: number;
  setIsDragging?: any;
}
interface Darg {
  isDragging: boolean;
  position: number;
}
const defaults = {
  startPosition: 50,
};

const ImageSplitter = ({ ...props }: Props) => {
  const splitter = { ...defaults, ...props };
  const [drag, setDrag] = useState<Darg>({
    isDragging: false,
    position: splitter.startPosition,
  });
  const refSplitter = useRef<HTMLDivElement>(null);
  const dragMoveHandler = useRef<any>();
  const refPosition = useRef(splitter.startPosition);
  const onDragStart = useCallback(() => {
    if (drag.isDragging) {
      return;
    }
    setDrag({ ...drag, isDragging: true });
  }, [drag]);

  const onMouseDown = useCallback(
    (event: any) => {
      if (event.button !== 0) {
        return;
      }
      props.setIsDragging(true);

      onDragStart();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onDragStart],
  );
  const onDragMove = useCallback(
    (event: MouseEvent) => {
      if (!drag.isDragging || !refSplitter.current) {
        return;
      }
      const rectBox = refSplitter.current.getBoundingClientRect();
      const p =
        ((event.pageX - rectBox.left) / (rectBox.right - rectBox.left)) * 100;
      refPosition.current = Math.min(100, Math.max(0, p));
      setDrag({ ...drag, position: Math.min(100, Math.max(0, p)) });
    },
    [drag],
  );

  const onMouseUp = useCallback(() => {
    setDrag({ ...drag, isDragging: false });
    props.setIsDragging(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drag]);

  useEffect(() => {
    if (!refSplitter.current) return;

    if (drag.isDragging) {
      dragMoveHandler.current = onDragMove;
      refSplitter.current.addEventListener(
        "mousemove",
        dragMoveHandler.current,
        {
          passive: false,
        },
      );
      refSplitter.current.addEventListener("mouseup", onMouseUp);
    } else {
      refSplitter.current.removeEventListener(
        "mousemove",
        dragMoveHandler.current,
      );
      refSplitter.current.removeEventListener("mouseup", onMouseUp);
      dragMoveHandler.current = undefined;
    }

    return () => {
      if (!refSplitter.current) return;
      refSplitter.current.removeEventListener(
        "mousemove",
        dragMoveHandler.current,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      refSplitter.current.removeEventListener("mouseup", onMouseUp);
    };
  }, [drag, onDragMove, onMouseUp]);

  return (
    <div className="content-splitter" ref={refSplitter}>
      <div className="content-splitter-main">{splitter.source}</div>
      <div
        className="content-splitter-layer"
        style={{ width: `${drag.position.toFixed(2)}%` }}
      >
        {splitter.content}
      </div>
      <div
        className="splitter-divider"
        onMouseDown={onMouseDown}
        style={{ left: `${drag.position.toFixed(2)}%` }}
      >
        <span></span>
      </div>
    </div>
  );
};

export default ImageSplitter;
