import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Point } from "utils/Point";
import { useGesture } from "@use-gesture/react";
import { localPoint } from "utils/localPoint";
import { clamp } from "lodash";
import { BoxProps } from "components/moveResizeHandler/BoxProps";
import { AddEntryType } from "features/entryEditor/EntryListItem";

interface MapControlProps {
  onChange: (deltaPos: Point, scale: number) => void;
  onFilesDropped: (files: File[]) => void;
  onEntryDropped: (entry: AddEntryType) => void;
  onBoxSelect: (params: BoxProps) => void;
  selectBoxRef: MutableRefObject<HTMLDivElement | null>;
}

const acceptedFiles = ["image/jpeg", "image/png"];
const handleDropEvent = (ev: React.DragEvent<any>) => {
  const files: File[] = [];
  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (let i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === "file") {
        const file = ev.dataTransfer.items[i].getAsFile();
        if (file) {
          if (acceptedFiles.includes(file.type)) {
            files.push(file);
          }
        }
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (let i = 0; i < ev.dataTransfer.files.length; i++) {
      const file = ev.dataTransfer.files[i];
      if (acceptedFiles.includes(file.type)) {
        files.push(file);
      }
    }
  }

  return files;
};

const MAX_ZOOM = 2.5;
const MIN_ZOOM = 0.2;

export default function useMapControl({
  onChange,
  onFilesDropped,
  onEntryDropped,
  onBoxSelect,
  selectBoxRef,
}: MapControlProps) {
  // const [selectDragStart, setSelectDragStart] = useState<Point | null>(null);
  // const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<Point>([0, 0]);
  const [zoom, setZoom] = useState(1);
  const [fileDragging, setFileDragging] = useState(false);
  const zoomRef = useRef(1);
  const dragStart = useRef<Point | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const bind = useGesture(
    {
      onDragStart: (evt) => {
        dragStart.current = localPoint(evt);

        // else if (selectBoxRef.current != null) {
        //   setSelectDragStart({ x, y });
        // }
      },
      onDrag: (event) => {
        const { movement, ctrlKey } = event;
        if (ctrlKey) {
          onChange(movement, zoomRef.current);
        } else {
          if (dragStart.current === null) {
            return;
          }
          const [x, y] = dragStart.current;
          const [x2, y2] = localPoint(event);

          if (selectBoxRef.current) {
            selectBoxRef.current.style.top = `${y}px`;
            selectBoxRef.current.style.display = "block";
            selectBoxRef.current.style.left = `${x}px`;
            selectBoxRef.current.style.width = `${x2 - x}px`;
            selectBoxRef.current.style.height = `${y2 - y}px`;
          }
        }
      },
      onDragEnd: (event) => {
        const {
          movement: [dx, dy],
          ctrlKey,
        } = event;
        if (ctrlKey) {
          if (dragStart.current != null) {
            const [x, y] = position;
            setPosition([
              x + dx * (1 / zoomRef.current),
              y + dy * (1 / zoomRef.current),
            ]);
            dragStart.current = null;

            onChange([0, 0], zoomRef.current);
          }
        } else {
          if (dragStart.current === null) {
            return;
          }
          const [x, y] = dragStart.current;
          const [x2, y2] = localPoint(event);
          onBoxSelect({ x, y, width: x2 - x, height: y2 - y });
          if (selectBoxRef.current) {
            selectBoxRef.current.style.display = "none";
          }
        }
      },
    },
    {
      drag: {
        filterTaps: true,
      },
    }
  );

  const enterCount = useRef(0);

  const handlers = useMemo(
    () => ({
      ...bind(),
      onDragEnter: (event: React.DragEvent<any>) => {
        event.stopPropagation();
        event.preventDefault();
        enterCount.current++;
        if (enterCount.current === 1) {
          setFileDragging(true);
        }
      },
      onDragOver: (event: React.DragEvent<any>) => {
        // Need to cancel this event otherwise onDrop won't trigger
        event.preventDefault();
      },
      onDragLeave: (event: React.DragEvent<any>) => {
        event.stopPropagation();
        enterCount.current--;
        if (enterCount.current === 0) {
          setFileDragging(false);
          // onDragEnd({ confirmed: false, event });
        }
      },
      onDrop: (event: React.DragEvent<any>) => {
        console.log("Drop: ", event);
        event.preventDefault();
        event.stopPropagation();
        const [dropX, dropY] = localPoint(event);
        enterCount.current = 0;
        setFileDragging(false);
        const files = handleDropEvent(event);
        if (files.length > 0) {
          onFilesDropped(files);
        } else if (event.dataTransfer.getData("entry")) {
          // TODO local point this
          const addedEntry: AddEntryType = JSON.parse(
            event.dataTransfer.getData("entry")
          );
          addedEntry.x = dropX;
          addedEntry.y = dropY;

          onEntryDropped(addedEntry);
        }

        // onDragEnd({ confirmed: true, event: event });
      },
      // The ref for the wheel event. We need to register it manually in order to
      // do it as an active event listener
      ref,
    }),
    [bind, onEntryDropped, onFilesDropped]
  );

  useEffect(() => {
    if (ref.current == null) {
      return;
    }
    const div = ref.current;

    const handler = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
        event.stopPropagation();
        const zoomDelta = event.deltaY < 0 ? -0.1 : 0.1;
        // zoomRef.current += ;
        // onChange([0, 0], zoomRef.current);
        setZoom((old) => clamp(old - zoomDelta, MIN_ZOOM, MAX_ZOOM));
      }
    };

    div.addEventListener("wheel", handler, { passive: false });

    return () => div.removeEventListener("wheel", handler);
  }, [ref]);

  const [x, y] = position;
  return {
    scale: zoom,
    offsetX: x,
    offsetY: y,
    fileDragging,
    handlers,
  };
}
