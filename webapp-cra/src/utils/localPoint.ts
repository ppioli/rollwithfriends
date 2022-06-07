import { FullGestureState } from "@use-gesture/react";
import { Point } from "utils/Point";

export function localPoint(
  event: Omit<FullGestureState<"drag">, "event"> & {
    event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
  }
): Point {
  const [x, y] = event.xy;
  const [cx, cy] = tryGetBoundingClientRect(event);

  return [x - cx, y - cy];
}

const tryGetBoundingClientRect = (
  event: Omit<FullGestureState<"drag">, "event"> & {
    event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
  }
) => {
  const target = event.event.currentTarget as any;
  if (target["getBoundingClientRect"] !== undefined) {
    const { x, y } = target.getBoundingClientRect();
    return [x, y];
  }

  return [0, 0];
};
