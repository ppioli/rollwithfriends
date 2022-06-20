import React, { useEffect, useMemo, useRef, useState } from "react";
import { Point } from "utils/Point";
import { useGesture } from "@use-gesture/react";
import { localPoint } from "utils/localPoint";
import { clamp } from "lodash";

export interface AddedEntry {
  type: string;
  entryId: string;
  x: number;
  y: number;
}

interface MapControlProps {
  onChange: (deltaPos: Point, scale: number) => void;
  onFilesDropped: (files: File[]) => void;
  onEntryDropped: (entry: AddedEntry) => void;
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
        enterCount.current = 0;
        setFileDragging(false);
        const files = handleDropEvent(event);
        if (files.length > 0) {
          onFilesDropped(files);
        } else if (event.dataTransfer.getData("type")) {
          // TODO local point this
          const addedEntry: AddedEntry = {
            entryId: event.dataTransfer.getData("entryId"),
            type: event.dataTransfer.getData("type"),
            x: event.screenX,
            y: event.screenY,
          };
          onEntryDropped(addedEntry);
        }

        // onDragEnd({ confirmed: true, event: event });
      },
      // The ref for the wheel event. We need to register it manually in order to
      // do it as an active event listener
      ref,
    }),
    [bind, onFilesDropped, zoom]
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
