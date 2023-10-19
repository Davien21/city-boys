import { useRef, useEffect } from "react";

/**
 * Hook to check if a value has changed since the component was mounted.
 * @param value The value to check.
 * @returns A boolean indicating if the value has changed since mount.
 */
function useHasChanged(value: any): boolean {
  const initialValue = useRef(value);
  const hasChanged = useRef(false);

  useEffect(() => {
    if (initialValue.current !== value) {
      hasChanged.current = true;
    }
  }, [value]);

  return hasChanged.current;
}

export { useHasChanged };
