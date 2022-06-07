import {
  EventHandler,
  MutableRefObject,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Point } from "utils/Point";
import { useGesture, useWheel } from "@use-gesture/react";
import { localPoint } from "utils/localPoint";
import { clamp } from "lodash";

interface MapControlProps {
  onChange: (deltaPos: Point, scale: number) => void;
  inputContainerRef: MutableRefObject<HTMLDivElement | null>;
}

const MAX_ZOOM = 2.5;
const MIN_ZOOM = 0.2;

export default function useMapControl({
  onChange,
  inputContainerRef,
}: MapControlProps) {
  // const [selectDragStart, setSelectDragStart] = useState<Point | null>(null);
  // const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<Point>([0, 0]);
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(1);
  const dragStart = useRef<Point | null>(null);

  const bind = useGesture(
    {
      onDragStart: (evt) => {
        console.log("Started");
        if (evt.ctrlKey) {
          dragStart.current = localPoint(evt);
        }
        // else if (selectBoxRef.current != null) {
        //   setSelectDragStart({ x, y });
        // }
      },
      onDrag: ({ movement }) => {
        if (dragStart.current !== null) {
          // const [nx, ny] = localPoint(evt);
          // const [x, y] = dragStart.current;
          onChange(movement, zoomRef.current);
        }
      },
      onDragEnd: ({ movement: [dx, dy] }) => {
        if (dragStart.current != null) {
          const [x, y] = position;
          setPosition([
            x + dx * (1 / zoomRef.current),
            y + dy * (1 / zoomRef.current),
          ]);
          dragStart.current = null;

          onChange([0, 0], zoomRef.current);
        }
      },
    },
    {
      drag: {
        filterTaps: true,
      },
    }
  );

  // Handle wheel event outside "useGesture" since passive mode seems to be broken
  useEffect(() => {
    if (inputContainerRef.current == null) {
      return;
    }
    const container = inputContainerRef.current;
    const handler = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
        event.stopPropagation();
        const zoomDelta = event.deltaY / 530;
        // zoomRef.current += ;
        // onChange([0, 0], zoomRef.current);
        let newZoom = clamp(zoom - zoomDelta, MIN_ZOOM, MAX_ZOOM);
        setZoom(newZoom);
      }
    };

    container.addEventListener("wheel", handler, {
      passive: false,
    });

    return () => container!.removeEventListener("wheel", handler);
  }, [inputContainerRef, zoom]);

  const [x, y] = position;
  return {
    scale: zoom,
    offsetX: x,
    offsetY: y,
    bind,
  };
}
