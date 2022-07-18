import { useCallback, useState } from "react";

export function useToggle(
  initialValue: boolean
): [boolean, () => void, (val: boolean) => void] {
  // Initialize the state
  const [state, setState] = useState(initialValue);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState((state) => !state), []);

  const set = useCallback((value: boolean) => setState(() => value), []);

  return [state, toggle, set];
}
