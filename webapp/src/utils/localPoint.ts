import { FullGestureState } from "@use-gesture/react";
import { Point } from "utils/Point";
import { DragEvent } from "react";

type DragEventType =
  | DragEvent<any>
  | (Omit<FullGestureState<"drag">, "event"> & {
      event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
    });

export function localPoint(event: DragEventType): Point {
  let x, y;
  if (isDragEvent(event)) {
    [x, y] = [event.clientX, event.clientY];
  } else {
    [x, y] = event.xy;
  }

  const [cx, cy] = tryGetBoundingClientRect(event);

  return [x - cx, y - cy];
}

const tryGetBoundingClientRect = (event: DragEventType) => {
  const target = (
    isDragEvent(event) ? event.currentTarget : event.event.currentTarget
  ) as any;
  if (target["getBoundingClientRect"] !== undefined) {
    const { x, y } = target.getBoundingClientRect();
    return [x, y];
  }

  return [0, 0];
};

function isDragEvent(event: DragEventType): event is DragEvent<any> {
  return (event as any).xy === undefined;
}
