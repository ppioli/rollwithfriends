import { Point } from "utils/Point";
import { useCallback, useState, Dispatch, SetStateAction } from "react";

export function usePosition(
  initialPosition?: Point
): [number, number, (value: Point) => void] {
  const [x, setX] = useState(initialPosition?.x ?? 0);
  const [y, setY] = useState(initialPosition?.y ?? 0);

  const setPosition = useCallback(({ x, y }: Point) => {
    setX(x);
    setY(y);
  }, []);

  return [x, y, setPosition];
}

export function useLocalStorage(
  key: string
): [string | null, (val: string | null) => void] {
  const [value, innerSet] = useState<string | null>(localStorage.getItem(key));

  const setValue = useCallback(
    (value: string | null) => {
      if (value == null) {
        localStorage.removeItem("key");
      } else {
        localStorage.setItem(key, value);
      }
      innerSet(value);
    },
    [key]
  );

  return [value, setValue];
}
