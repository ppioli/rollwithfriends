import { Point } from "utils/Point";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { isFunction } from "utils/tsHelpers";

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
): [T | null, Dispatch<SetStateAction<T | null>>] {
  const [value, setValue] = useState<T | null>(recoverStoredValue(key));

  const setValueWrapper: Dispatch<SetStateAction<T | null>> = useCallback(
    (action: SetStateAction<T | null>) => {
      const newValue = isFunction(action) ? action(value) : action;

      setValue(newValue);
      if (newValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    },
    [key, value]
  );

  return [value, setValueWrapper];
}
