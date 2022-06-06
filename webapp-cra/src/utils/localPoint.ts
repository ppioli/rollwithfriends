import { FullGestureState } from "@use-gesture/react";

export function localPoint(
  event: Omit<FullGestureState<"drag">, "event"> & {
    event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
  }
) {
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
    console.log(" X Y ", x, y);
    return [x, y];
  }

  return [0, 0];
};
