import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { isFunction } from "utils/tsHelpers";

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
