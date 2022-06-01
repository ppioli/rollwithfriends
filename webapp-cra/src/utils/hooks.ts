import { Point } from "utils/Point";
import { useCallback, useEffect, useState } from "react";

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

const recoverStoredValue = (key: string) => {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : null;
  } catch (e) {
    console.warn(
      `An error occurred while accessing the stored value at ${key}`
    );
    localStorage.removeItem(key);
  }

  return null;
};

export function useLocalStorage<T = string>(
  key: string
): [T | null, (val: T | null) => void] {
  const [value, setValue] = useState<T | null>(recoverStoredValue(key));

  const setValueWrapper = useCallback(
    (value: T | null) => {
      setValue(value);
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [key]
  );

  return [value, setValueWrapper];
}
