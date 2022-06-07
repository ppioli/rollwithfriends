import { RefObject, useState } from "react";
import { Point } from "utils/Point";
import { useGesture } from "@use-gesture/react";
import { usePosition } from "utils/hooks";
import { localPoint } from "utils/localPoint";

interface MapControlProps {
  onDrag?: (deltaPos: Point) => void;
  onScale?: (scale: number) => void;
}

export default function useMapControl({ onDrag, onScale }: MapControlProps) {
  const [dragStart, setDragStart] = useState<Point | null>(null);
  const [selectDragStart, setSelectDragStart] = useState<Point | null>(null);
  const [scale, setScale] = useState(1);
  const [x, y, setPosition] = usePosition({ x: 0, y: 0 });
  const [dx, dy, setDeltaPosition] = usePosition({ x: 0, y: 0 });

  const bind = useGesture({
    onDragStart: (evt) => {
      const [x, y] = localPoint(evt);
      if (evt.ctrlKey) {
        setDragStart({ x, y });
      }
      // else if (selectBoxRef.current != null) {
      //   setSelectDragStart({ x, y });
      // }
    },
    onDrag: (evt) => {
      const [nx, ny] = localPoint(evt);
      if (dragStart !== null && onDrag) {
        const { x, y } = dragStart;
        const deltaPos = { x: nx - x, y: ny - y };
        onDrag(deltaPos);
        setDeltaPosition(deltaPos);
      }
      // if (selectDragStart !== null && selectBoxRef.current != null) {
      //   // TODO Normalize points so you can drag backwards
      //   const { x, y } = selectDragStart;
      //   selectBoxRef.current.style.top = `${y}px`;
      //   selectBoxRef.current.style.left = `${x}px`;
      //   selectBoxRef.current.style.width = `${nx - x}px`;
      //   selectBoxRef.current.style.height = `${ny - y}px`;
      //   selectBoxRef.current.style.display = "block";
      // }
    },
    onDragEnd: () => {
      if (dragStart != null) {
        setPosition({ x: x + dx, y: y + dy });
        setDragStart(null);
        if (onDrag) {
          onDrag({ x: 0, y: 0 });
        }
      }

      // if (selectDragStart != null && selectBoxRef.current) {
      //   setSelectDragStart(null);
      //   selectBoxRef.current.style.display = "none";
      // }
    },
    onWheel: (evt) => {},
    onScroll: (evt) => console.log(evt),
  });

  return {
    bind,
    x,
    y,
  };
}
