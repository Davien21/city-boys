import { useEffect, RefObject } from "react";

const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (event: MouseEvent | TouchEvent) => void,
  filterFunc: ((event: MouseEvent | TouchEvent) => boolean) | null = null
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (filterFunc && filterFunc(event)) return;

      // use composedPath for more robust Shadow DOM support
      const path = event.composedPath();
      if (!path || !ref.current || path.includes(ref.current)) return;
      callback(event);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, callback, filterFunc]);
};

export { useClickOutside };
