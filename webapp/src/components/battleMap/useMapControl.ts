import { useState } from "react";
import { addPoint, Point } from "utils/Point";
import { useGesture } from "@use-gesture/react";
import { usePosition } from "utils/hooks";

interface MapControlProps {
  onDrag?: (deltaPos: Point) => void;
  onScale?: (scale: number) => void;
}

export default function useMapControl({ onDrag, onScale }: MapControlProps) {
  const [dragStart, setDragStart] = useState<Point>(null);
  const [scale, setScale] = useState(1);
  const [x, y, setPosition] = usePosition({ x: 0, y: 0 });
  const [dx, dy, setDeltaPosition] = usePosition({ x: 0, y: 0 });

  const bind = useGesture(
    {
      onDragStart: (evt) => {
        if (evt.ctrlKey) {
          const [x, y] = evt.xy;
          setDragStart({ x, y });
        }
      },
      onDrag: (evt) => {
        if (dragStart !== null && onDrag) {
          const { x, y } = dragStart;
          const [nx, ny] = evt.xy;
          const deltaPos = { x: nx - x, y: ny - y };
          onDrag(deltaPos);
          setDeltaPosition(deltaPos);
        }
      },
      onDragEnd: () => {
        if (dragStart != null) {
          setPosition({ x: x + dx, y: y + dy });
          setDragStart(null);
          onDrag({ x: 0, y: 0 });
        }
      },
      onWheel: (evt) => {},
      onScroll: (evt) => console.log(evt),
    },
    {
      enabled: true,
      eventOptions: { capture: true, passive: false },
      scroll: { preventDefault: true },
      wheel: {
        preventDefault: true,
        eventOptions: { capture: true, passive: false },
      },
    }
  );

  return {
    bind,
    x,
    y,
  };
}
